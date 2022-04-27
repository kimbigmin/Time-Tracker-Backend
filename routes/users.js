const { Router } = require("express");
const { User, Time } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();
/* GET users listing. */
router.get("/test", function (req, res, next) {
  const post = Time.create();

  res.json(post);
});

router.get("/getTest", async function (req, res, next) {
  const posts = await User.find({});

  res.json(posts);
});

module.exports = router;
