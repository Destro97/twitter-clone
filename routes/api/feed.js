const express = require("express");
const router = express.Router();

const { verifyTokenMiddleware } = require("../../middleware/auth");
const { fetchUserFeed } = require("../../controllers/feed");

router.get("/", verifyTokenMiddleware, fetchUserFeed);

module.exports = router;
