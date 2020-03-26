const { check } = require("express-validator");

module.exports.createTweetValidator = [
  check("text", "Tweet body is required")
    .not()
    .isEmpty()
];
