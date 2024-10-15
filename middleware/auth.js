const { verifyToken } = require("../services/token");
const User = require("../Models/user");

const isAuthenticated = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin resource. Access denied" });
  }
  next();
};

module.exports = { isAuthenticated, isAdmin };
