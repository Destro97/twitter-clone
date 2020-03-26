const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  }
});

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  hashtags: {
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date
  },
  comments: {
    type: [commentSchema]
  },
  likes: {
    type: [likeSchema]
  }
});

module.exports = User = mongoose.model("tweet", TweetSchema);
