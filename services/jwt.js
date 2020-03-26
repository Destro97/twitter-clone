const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/keys");

module.exports.generateToken = id => {
  const pl = {
    user: { id }
  };
  // generate a token with user id and secret
  const token = jwt.sign(pl, JWT_SECRET, {
    expiresIn: 3600
  });
  return token;
};

module.exports.verifyToken = token => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (err) {
    console.error(`Error decoding token ${token} as ${err}`);
    return false;
  }
};
