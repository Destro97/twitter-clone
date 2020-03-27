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

router.get("/", verifyTokenMiddleware, (req, res) => res.send("Auth Route"));

router.post("/", userLoginValidator, login);

router.get("/google", googleLoginUrl);

router.post("/google/callback", googleLogin);

router.post("/email", userLocalSignupValidator, signup);

module.exports = router;
