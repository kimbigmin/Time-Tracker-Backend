const { Router } = require("express");
const { Time, User } = require("../models");
const asyncHandler = require("../utils/async-handler");

const router = Router();

// 유저가 입력한 전체 시간 조회 API
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const author = await User.findOne({ shortId: req.user.shortId });
    const allTime = await Time.find({ author: author._id });
    res.json(allTime);
  })
);

// 시간 기록 생성 API
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const timeData = req.body;
    const author = await User.findOne({ shortId: req.user.shortId });
    const post = await Time.create({ ...timeData, author });

    res.json(post);
  })
);

// 해당 날짜 시간 조회 API
router.get(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const timeData = await Time.findOne({ shortId });
    res.json(timeData);
  })
);

// 해당 날짜 시간 수정 API
router.post(
  "/:shortId",
  asyncHandler(async (req, res) => {
    const { shortId } = req.params;
    const timeData = req.body;
    const author = await User.findOne({ shortId: req.user.shortId });
    const updatedData = await Time.findOneAndUpdate(
      { shortId },
      {
        ...timeData,
        author,
      }
    );
    res.json(updatedData);
  })
);

module.exports = router;
