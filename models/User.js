const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  handle: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  hashPassword: {
    type: String
  },
  salt: {
    type: String
  },
  avatar: {
    type: String
  },
  googleID: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  followers: [
    {
      user: {
        id: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        name: {
          type: String
        }
      }
    }
  ],
  following: [
    {
      user: {
        id: {
          type: Schema.Types.ObjectId,
          ref: "users"
        },
        name: {
          type: String
        }
      }
    }
  ]
});

UserSchema.index({ handle: "text" });

UserSchema.methods.encryptPassword = function(password) {
  if (!password) return "";
  try {
    return (hash = crypto
      .createHmac("sha1", this.salt)
      .update(password)
      .digest("hex"));
  } catch (err) {
    return "";
  }
};

// Virtual Field
UserSchema.virtual("password")
  .set(function(password) {
    //create temporary variable called _password
    this._password = password;
    //generate a timestamp
    this.salt = uuidv1();
    //encrypt password
    this.hashPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// For Authentication like during Sign In
UserSchema.methods.authenticate = function(plainPassword) {
  return this.encryptPassword(plainPassword) === this.hashPassword;
};

module.exports = User = mongoose.model("user", UserSchema);
