const gravatar = require("gravatar");

const { errorHandler } = require("../services/errorHandlers");
const {
  urlGoogle,
  getGoogleAccountFromCode
} = require("../services/googleAuth");
const { generateToken } = require("../services/jwt");
const User = require("../models/User");

module.exports.login = async (req, res) => {
  const error = errorHandler(req);
  if (error) {
    return res.status(400).json({
      message: error
    });
  }
  const { email, password } = req.body;
  const userdata = await User.findOne({ email });
  if (!userdata) {
    return res.status(404).json({
      message: "User with provided email doesn't exist. Please Signup."
    });
  }
  if (!userdata.authenticate(password)) {
    return res.status(401).json({
      message: "Email or Password incorrect."
    });
  }
  const token = generateToken(userdata._id);
  return res.status(200).json({
    message: "Login Successful",
    payload: {
      token,
      user: {
        id: userdata._id,
        name: userdata.displayName,
        email: userdata.email,
        handle: userdata.handle,
        avatar: userdata.avatar
      }
    }
  });
};

module.exports.signup = async (req, res) => {
  const error = errorHandler(req);
  if (!error) {
    const existingUser = await User.findOne({
      email: req.body.email
    });
    if (existingUser) {
      return res.status(406).json({
        message: "Account with provided email already exists."
      });
    }
    const sameHandleUsers = await User.find({
      $text: { $search: req.body.handle }
    });
    console.log(sameHandleUsers);
    if (sameHandleUsers.length > 0) {
      return res.status(406).json({
        message: `Handle ${req.body.handle} is already taken.`
      });
    }
    if (req.body.lastName) {
      req.body.displayName = `${req.body.firstName} ${req.body.lastName}`;
    } else {
      req.body.displayName = req.body.firstName;
    }
    req.body.avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    const user = new User(req.body);
    const userdata = await user.save();
    const returnData = {
      id: userdata._id,
      name: userdata.displayName,
      handle: userdata.handle,
      email: userdata.email,
      avatar: userdata.avatar
    };
    const token = generateToken(userdata._id);
    return res.status(200).json({ user: returnData, token });
  } else {
    return res.status(400).json({
      message: error
    });
  }
};

module.exports.googleLoginUrl = (req, res) => {
  res.status(200).json({
    url: urlGoogle()
  });
};

module.exports.googleLogin = async (req, res) => {
  console.log(req.body.code);
  console.log(req.body);
  const code = req.body.code;
  const userdata = await getGoogleAccountFromCode(code);
  if (userdata.err) return res.status(500).json({ err: userdata.err });
  const token = generateToken(userdata._id);
  const userId = userdata._id;
  userdata.id = userId;
  delete userdata._id;
  return res.status(200).json({ user: userdata, token });
};
