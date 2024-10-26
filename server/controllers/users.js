const User = require("../Models/user");
const { hashPassword, comparePassword } = require("../services/hash");
const { generateToken } = require("../services/jwt");

const signup = async (req, res, next) => {
  try {
    const {
      nom,
      prenom,
      telephone,
      genre,
      ville,
      quartier,
      domaineTravail,
      estEtudiant,
      disponibilite,
      motDePasse,
    } = req.body;
    const parsedDisponibilite = JSON.parse(disponibilite);
    // Validation
    if (!nom) throw new Error("Name is required");
    if (!prenom) throw new Error("Surname is required");
    if (!telephone) throw new Error("telephone number is required");
    if (!genre) throw new Error("gender is required");
    if (!ville) throw new Error("town is required");
    if (!quartier) throw new Error("quarter is required");
    if (!domaineTravail) throw new Error("domain of work is required");
    if (!estEtudiant) throw new Error("This field is required");
    if (!parsedDisponibilite) throw new Error("Availability is required");
    if (!motDePasse) throw new Error("Password is required");

    if (motDePasse.length < 5)
      throw new Error("Password must be at least 5 characters");
    // if (motDePasse !== confirmPassword) throw new Error("Passwords must match");

    const hashedPassword = await hashPassword(motDePasse);

    //codeMenager
    const codeMenager = Math.floor(10000 + Math.random() * 90000);

    // Create new user
    const newUser = new User({
      nom,
      prenom,
      telephone,
      genre,
      ville,
      quartier,
      domaineTravail,
      estEtudiant,
      disponibilite: parsedDisponibilite,
      cniRecto: req.files["cniRecto"][0].path,
      cniVerso: req.files["cniVerso"][0].path,
      motDePasse: hashedPassword,
      codeMenager: codeMenager,
    });

    // Save the user to the database
    await newUser.save();

    console.log(newUser);
    const token = generateToken(newUser);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { codeMenager, motDePasse } = req.body;

    const user = await User.findOne({ codeMenager });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed, Wrong email or password" });
    }

    const isMatch = await comparePassword(motDePasse, user.motDePasse);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed, Wrong credentials" });
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
