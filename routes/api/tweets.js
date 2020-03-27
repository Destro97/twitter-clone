const express = require("express");
const router = express.Router();

const { createTweetValidator } = require("../../middleware/tweets");
const { verifyTokenMiddleware } = require("../../middleware/auth");
const {
  createTweet,
  retrieveTweet,
  updateTweet,
  deleteTweet
} = require("../../controllers/tweets");

// @route   GET api/tweets
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Tweets Route"));

router.post("/", verifyTokenMiddleware, createTweetValidator, createTweet);

router.get("/:id", retrieveTweet);

router.put("/:id", verifyTokenMiddleware, updateTweet);

router.delete("/:id", verifyTokenMiddleware, deleteTweet);

module.exports = router;
