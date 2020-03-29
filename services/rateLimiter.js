const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redis = require("redis");
const client = redis.createClient();

module.exports.limiter = new RateLimit({
  store: new RedisStore({
    client: client
  }),
  max: 100,
  windowMs: 10 * 60 * 1000,
  delayMs: 0,
  handler: (req, res) => {
    return res.status(429).json({
      message: "Request rate limit exceeded"
    });
  }
});
