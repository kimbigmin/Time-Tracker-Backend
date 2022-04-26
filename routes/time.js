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

module.exports = router;
