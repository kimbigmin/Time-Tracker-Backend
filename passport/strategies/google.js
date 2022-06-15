const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models");
require("dotenv").config();

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    "http://ec2-52-78-39-53.ap-northeast-2.compute.amazonaws.com/api/auth/google/callback",
};

async function findOrCreateUser({ name, email }) {
  const user = await User.findOne({
    email,
  });
  if (user) {
    return user;
  }
  const created = await User.create({
    name,
    email,
    password: "GOOGLE_OAUTH",
  });
  return created;
}

module.exports = new GoogleStrategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json;
    try {
      const user = await findOrCreateUser({ email, name });
      done(null, {
        shortId: user.shortId,
        email: user.email,
        name: user.name,
      });
    } catch (e) {
      done(e, null);
    }
  }
);
