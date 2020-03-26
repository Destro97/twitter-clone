const express = require("express");
const router = express.Router();

router.use("/users", require("./api/users"));
router.use("/auth", require("./api/auth"));
router.use("/feed", require("./api/feed"));
router.use("/tweets", require("./api/tweets"));

module.exports = router;
