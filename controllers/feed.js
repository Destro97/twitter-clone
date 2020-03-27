const { errorHandler } = require("../services/errorHandlers");

const User = require("../models/User");
const Tweet = require("../models/Tweet");

module.exports.fetchUserFeed = async (req, res) => {
  const reqUser = await User.findById(req.user.id).select("following");
  const userFollowing = reqUser.following;
  if (userFollowing.length === 0)
    return res.status(200).json({
      message: "Follow someone to see their tweets here!"
    });
  const userFollowingUserIds = userFollowing.map(user => user.user.id);
  const tweets = await Tweet.find({ user: { $in: userFollowingUserIds } }).sort(
    {
      created: -1
    }
  );
  if (!tweets.length)
    return res.status(404).json({
      message: "No tweets to show!"
    });
  return res.status(404).json({
    message: "ok",
    payload: { tweets }
  });
};
