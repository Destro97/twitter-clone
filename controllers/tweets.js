const { errorHandler } = require("../services/errorHandlers");

const Tweet = require("../models/Tweet");

module.exports.createTweet = async (req, res) => {
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
  const newTweet = new Tweet(newTweetBody);
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

module.exports.updateTweet = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  let tweet;
  try {
    tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    if (req.user.id !== tweet.user.toString()) {
      return res.status(403).json({
        message: "User not authorised to perform this action"
      });
    }
    if (req.body.hashtags) tweet.hashtags = req.body.hashtags;
    if (req.body.text) tweet.text = req.body.text;
    tweet.updated = Date.now();
    await tweet.save();
  } catch (err) {
    console.error(`Error occured while saving tweet ${err}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: {
      tweet: tweet
    }
  });
};

module.exports.deleteTweet = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  let tweetId;
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    if (req.user.id !== tweet.user.toString()) {
      return res.status(403).json({
        message: "User not authorised to perform this action"
      });
    }
    tweetId = tweet.id;
    await tweet.remove();
  } catch (err) {
    console.error(`Error occured while deleting tweet ${err}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: { tweetId }
  });
};

module.exports.retrieveTweet = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  let tweet;
  try {
    tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
  } catch (err) {
    console.error(`Error occured while deleting tweet ${err}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: { tweet }
  });
};

module.exports.tweetsByUserId = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  console.log(req.headers);
  let tweets;
  try {
    tweets = await Tweet.find({ user: req.params.id }).sort({ created: -1 });
    if (!tweets.length) {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
  } catch (err) {
    console.error(`Error occured while deleting tweet ${err}`);
    if (err.kind == "ObjectId") {
      return res.status(400).json({
        message: "Resource not found"
      });
    }
    return res.status(500).json({
      message: "internal server error"
    });
  }
  return res.status(200).json({
    message: "ok",
    payload: { tweets }
  });
};
