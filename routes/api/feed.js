const express = require("express");
const router = express.Router();

const { verifyTokenMiddleware } = require("../../middleware/auth");
const { fetchUserFeed } = require("../../controllers/feed");

// @route   GET api/feed
// @desc    Test route
// @access  Private
router.get("/", verifyTokenMiddleware, fetchUserFeed);

module.exports = router;
