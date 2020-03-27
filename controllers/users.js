const { errorHandler } = require("../services/errorHandlers");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports.fetchUserProfile = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  const newTweetBody = {
    user: req.user.id,
    text: req.body.text
  };
  if (req.body.hashtags) newTweetBody.hashtags = req.body.hashtags;
  const newTweet = new User(newTweetBody);
  let savedTweet;
  try {
    savedTweet = await newTweet.save();
  } catch (err) {
    console.error(`Error occured while saving tweet ${err}`);
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: {
      tweet: savedTweet
    }
  });
};

module.exports.followUser = async (req, res) => {
  const requestUserId = req.user.id;
  const followedUserId = req.params.id;
  if (requestUserId === followedUserId) {
    return res.status(400).json({
      message: "Bad request"
    });
  }
  try {
    const requestUser = await User.findById(requestUserId);
    const followedUser = await User.findById(followedUserId);
    if (!requestUser || !followedUser) {
      return res.status(406).json({
        message: "Unacceptable request"
      });
    }
    console.log(requestUser.following);
    requestUser.following.forEach(us => console.log(typeof us));
    console.log(followedUser._id);
    console.log(typeof followedUser._id);
    console.log(
      requestUser.following.filter(
        followingUser => followingUser.user.id.toString() === followedUserId
      ).length
    );
    if (
      requestUser.following.filter(
        followingUser => followingUser.user.id.toString() === followedUserId
      ).length > 0
    ) {
      return res.status(400).json({
        message: "Bad request"
      });
    }
    requestUser.following.push({
      user: {
        id: followedUserId,
        name: followedUser.displayName
      }
    });
    await requestUser.save();
    followedUser.followers.push({
      user: {
        id: requestUserId,
        name: requestUser.displayName
      }
    });
    await followedUser.save();
  } catch (err) {
    console.error(
      `Error occured while processing follow request by user ${requestUserId} for user ${followedUserId} as${err}`
    );
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "User not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: {
      success: true
    }
  });
};

module.exports.unfollowUser = async (req, res) => {
  const requestUserId = req.user.id;
  const unfollowedUserId = req.params.id;
  try {
    const requestUser = await User.findById(requestUserId);
    const unfollowedUser = await User.findById(unfollowedUserId);
    if (!requestUser || !unfollowedUser) {
      return res.status(406).json({
        message: "Unacceptable request"
      });
    }
    const unfollowedUserIndex = requestUser.following.findIndex(
      followedUser => followedUser.user.id.toString() === unfollowedUserId
    );
    const requestUserIndex = unfollowedUser.followers.findIndex(
      followingUser => followingUser.user.id.toString() === requestUserId
    );
    if (unfollowedUserIndex === -1 || requestUserIndex === -1) {
      return res.status(406).json({
        message: "Unacceptable request"
      });
    }
    requestUser.following.splice(unfollowedUserIndex, 1);
    await requestUser.save();
    unfollowedUser.followers.splice(requestUserIndex, 1);
    await unfollowedUser.save();
  } catch (err) {
    console.error(
      `Error occured while processing unfollow request by user ${requestUserId} for user ${unfollowedUserId}`
    );
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "User not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: {
      success: true
    }
  });
};
