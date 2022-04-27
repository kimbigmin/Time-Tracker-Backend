const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models");

const config = {
  clientID:
    "122758302056-302p1np3riultlfba8gpvugg5i29unl8.apps.googleusercontent.com", // clientId 설정하기
  clientSecret: "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", // clientSecret 설정하기
  callbackURL: "/auth/google/callback",
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
