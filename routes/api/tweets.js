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

router.get("/", (req, res) => res.send("Tweets Route"));

router.post("/", verifyTokenMiddleware, createTweetValidator, createTweet);

router.get("/:id", retrieveTweet);

router.put("/:id", verifyTokenMiddleware, updateTweet);

router.delete("/:id", verifyTokenMiddleware, deleteTweet);

// TO BE IMPLEMENTED
// router.post("/:id/like", verifyTokenMiddleware, updateTweet);

// router.post("/:id/unlike", verifyTokenMiddleware, updateTweet);

// router.post("/:id/comment", verifyTokenMiddleware, updateTweet);

// router.put("/:id/comment", verifyTokenMiddleware, updateTweet);

// router.delete("/:id/comment", verifyTokenMiddleware, updateTweet);

module.exports = router;
