const { Router } = require("express");
const passport = require("passport");
const asyncHandler = require("../utils/async-handler");
const { setUserToken } = require("../utils/jwt");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: "https://time-trackers.com",
    failureRedirect: "/",
    failureFlash: true,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    successRedirect: "https://time-trackers.com",
    failureRedirect: "/",
    failureFlash: true,
  }),
  (req, res, next) => {
    // userToken 설정하기
    console.log("Succeese!!!!");
    setUserToken(res, req.user); // jwt
    res.redirect("https://time-trackers.com");
  }
);

router.get(
  "/logout",
  asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
  })
);

module.exports = router;
