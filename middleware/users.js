const { check } = require("express-validator");

module.exports.userLocalSignupValidator = [
  check("firstName", "First Name is required")
    .not()
    .isEmpty(),
  check("lastName", "Last Name is required")
    .not()
    .isEmpty(),
  check("handle", "Handle is required")
    .not()
    .isEmpty(),
  check("email", "Email is required")
    .not()
    .isEmpty(),
  check("email", "Email is not in correct format").isEmail(),
  check("password", "Password is required")
    .not()
    .isEmpty(),
  check("password", "Password length must be atleast 6 characters").isLength({
    min: 6
  }),
  check("password", "Password must contain a number").matches(/\d/)
];

module.exports.userLoginValidator = [
  check("email", "Email is required")
    .not()
    .isEmpty(),
  check("email", "Email is not in correct format").isEmail(),
  check("password", "Password is required")
    .not()
    .isEmpty()
];
