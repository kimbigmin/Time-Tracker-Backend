const jwt = require("jsonwebtoken");

const secret = "bigmin";

exports.secret = secret;

exports.setUserToken = (res, user) => {
  const token = jwt.sign(user, secret);
  res.send(token);
};
