const express = require("express");
const router = express.Router();

const { tweetsByUserId } = require("../../controllers/tweets");

router.get("/:id/tweets", tweetsByUserId);

module.exports = router;
