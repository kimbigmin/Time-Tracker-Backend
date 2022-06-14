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
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // userToken 설정하기
    setUserToken(res, req.user); // jwt
    res.redirect(process.env.CLIENT_URL);
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
