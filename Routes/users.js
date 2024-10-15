const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  UserDashboard,
  forgotPassword,
  resetPassword,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/dashboard", auth, UserDashboard);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
