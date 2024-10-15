const User = require("../Models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/token");

// Inscription d'un nouvel utilisateur
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Génération du token en utilisant l'id de l'utilisateur et son email
    const tokenData = { userId: user._id, email: user.email };

    // Attendez la création du token
    const token = await createToken(tokenData);

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
