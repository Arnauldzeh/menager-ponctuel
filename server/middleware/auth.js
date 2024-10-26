const { verifyToken } = require("../services/jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = verifyToken(token);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed / Token Expired" });
  }
};

module.exports = authMiddleware;
