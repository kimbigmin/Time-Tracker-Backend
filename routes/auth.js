const { Router } = require("express");
const passport = require("passport");
const asyncHandler = require("../utils/async-handler");
const { setUserToken } = require("../utils/jwt");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://time-trackers.com",
    session: true,
  }),
  async (req, res, next) => {
    // userToken 설정하기
    res.redirect("https://time-trackers.com");
  }
);

// router.get(
//   "/logout",
//   asyncHandler(async (req, res) => {
//     res.clearCookie("token");
//     res.redirect("/");
//   })
// );

router.get("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.redirect("https://time-trackers.com");
  }
});

module.exports = router;
