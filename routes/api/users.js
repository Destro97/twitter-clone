const express = require("express");
const router = express.Router();

const { verifyTokenMiddleware } = require("../../middleware/auth");
const { tweetsByUserId } = require("../../controllers/tweets");
const {
  fetchUserProfile,
  followUser,
  unfollowUser,
  fetchAllUsers,
  searchByHandle
} = require("../../controllers/users");

router.get("/", fetchAllUsers);

router.get("/search/handle", searchByHandle);

router.get("/:id/tweets", tweetsByUserId);

router.get("/:id/profile", fetchUserProfile);

router.post("/:id/follow", verifyTokenMiddleware, followUser);

router.post("/:id/unfollow", verifyTokenMiddleware, unfollowUser);

module.exports = router;
