const { Router } = require("express");
const passport = require("passport");
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
    res.redirect("http://localhost:3001");
  }
);

module.exports = router;
