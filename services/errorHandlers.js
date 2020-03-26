const { validationResult } = require("express-validator");

module.exports.errorHandler = req => {
  const errors = validationResult(req);
  //if errors are present show the first one
  // console.log(errors);
  // console.log(typeof(errors));
  if (!errors.isEmpty()) {
    const errors_array = errors.array();
    const first_error = errors_array[0].msg;
    return first_error;
  } else {
    return false;
  }
};

module.exports.unauthorisedErrorHandler = function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(403).json({
      message: "User is Unauthorised to access this resource."
    });
  }
};
