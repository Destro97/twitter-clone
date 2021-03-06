const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    required: true
  }
});

const likeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
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

TweetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  }
});

module.exports = User = mongoose.model("tweet", TweetSchema);
