const { Router } = require("express");
const { Time, User } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();

router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const post = await Time.findOne({ shortId }).populate("author");
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const author = await User.findOne({ shortId: req.user.shortId });
    console.log(author);
  })
);

module.exports = router;
