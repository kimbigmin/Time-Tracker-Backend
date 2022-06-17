const { Router } = require("express");
const passport = require("passport");
const asyncHandler = require("../utils/async-handler");
const { setUserToken } = require("../utils/jwt");

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL:
      "http://ec2-52-78-39-53.ap-northeast-2.compute.amazonaws.com/api/auth/google/callback",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // userToken 설정하기
    setUserToken(res, req.user); // jwt
    res.redirect("https://d3vlj3j3xnrtwg.cloudfront.net");
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
