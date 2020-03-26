const { verifyToken } = require("../services/jwt");

module.exports.verifyTokenMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid Token" });
  }
  req.user = decodedToken.user;
  next();
};
