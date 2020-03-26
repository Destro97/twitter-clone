const express = require("express");
const router = express.Router();

// @route   GET api/feed
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Feed Route"));

module.exports = router;
