const User = require("../Models/user");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken } = require("../services/jwt");
const { emailManager } = require("../services/mailing");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, balance } = req.body;

    // Validation
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    if (password.length < 5)
      throw new Error("Password must be at least 5 characters");
    if (password !== confirmPassword) throw new Error("Passwords must match");

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new Error("Use a different email");

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      balance,
    });

    // Save the user to the database
    await newUser.save();

    // Log the user data (optional)
    console.log(newUser);
    const token = generateToken(newUser);

    //Send email
    await emailManager(
      newUser.email,
      "Welcome to expense tracker. We hope you can tracker your expenses easily from our platform",
      "html",
      "Welcome to expense tracker app"
    );
    // Send success response
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed, Wrong email or password" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed, Wrong email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const UserDashboard = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userData._id }).select(
      "name balance email"
    );

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    const user_id = req.userData._id;
    if (!user_id) {
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized. User ID not found." });
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  const getUser = await User.findOne({ email: email });
  if (!getUser) {
    return res.status(400).json({
      message: "This email does'nt exist",
    });
  }

  //create reset code
  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await User.updateOne(
    {
      email: email,
    },
    {
      resetCode: resetCode,
    },
    {
      runValidators: true,
    }
  );

  //Send email
  await emailManager(
    email,
    "Your password reset code is " + resetCode,
    "Your password reset code is " + resetCode,
    "Reset your password"
  );

  return res.status(200).json({
    message: "A reset code has been sent to your email address",
  });
};

const resetPassword = async (req, res) => {
  const { email, resetCode, newPassword } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }
  if (!resetCode) {
    return res.status(400).json({
      message: "resetCode is required",
    });
  }
  if (!newPassword) {
    return res.status(400).json({
      message: "newPassword is required",
    });
  }

  if (newPassword.length < 5) {
    return res.status(400).json({
      message: "Password be stleast 5 caracters",
    });
  }

  const getUserWithResetCode = await User.findOne({
    email: email,
    resetCode: resetCode,
  });

  if (!getUserWithResetCode) {
    return res.status(200).json({
      message: "Email or reset code does not match",
    });
  }
  // Ensure hashPassword is awaited
  const hashedNewPassword = await hashPassword(newPassword);
  await User.updateOne(
    {
      email: email,
    },
    {
      password: hashedNewPassword,
      resetCode: "",
    }
  );

  //Send email
  await emailManager(
    email,
    "Your password was reset successfully  ",
    "Your password was reset successfully",
    "Reset your password"
  );

  return res.status(200).json({
    message: "Reset Password successfully",
  });
};
module.exports = {
  signup,
  signin,
  UserDashboard,
  forgotPassword,
  resetPassword,
};
