const express = require("express");

const {
  userLocalSignupValidator,
  userLoginValidator
} = require("../../middleware/users");
const { verifyTokenMiddleware } = require("../../middleware/auth");
const {
  login,
  signup,
  googleLoginUrl,
  googleLogin
} = require("../../controllers/auth");

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", verifyTokenMiddleware, (req, res) => res.send("Auth Route"));

// @route   POST api/auth
// @desc    Login route
// @access  Public
router.post("/", userLoginValidator, login);

// @route   GET api/auth/google
// @desc    Google Auth Route
// @access  Public
router.get("/google", googleLoginUrl);

// @route   POST api/auth/google/callback
// @desc    Google Auth Route Callback
// @access  Public
router.post("/google/callback", googleLogin);

// @route   POST api/auth/email
// @desc    Register user through email route
// @access  Public
router.post("/email", userLocalSignupValidator, signup);

module.exports = router;
