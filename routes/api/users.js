const express = require("express");
const router = express.Router();

// @route   get api/users
// @desc    Profile route
// @access  Public
router.get("/profile", (req, res) => {
  console.log(req.body);
  console.log(req.user);
  res.send("User Route");
});

module.exports = router;
