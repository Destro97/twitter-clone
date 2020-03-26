const express = require("express");
const router = express.Router();

const {
  createTweet,
  deleteTweet,
  updateTweet
} = require("../../controllers/tweets");
const { createTweetValidator } = require("../../middleware/tweets");
const { verifyTokenMiddleware } = require("../../middleware/auth");

// @route   GET api/tweets
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Tweets Route"));

router.post("/", verifyTokenMiddleware, createTweetValidator, createTweet);

router.delete("/:id", verifyTokenMiddleware, deleteTweet);

router.put("/:id", verifyTokenMiddleware, updateTweet);

module.exports = router;
