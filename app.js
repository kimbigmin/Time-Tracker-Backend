const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const timeRouter = require("./routes/time");
const usersRouter = require("./routes/users");
const passport = require("passport");
const cors = require("cors");
const getUserFromJWT = require("./middlewares/get-user-from-jwt");
const session = require("express-session");
const { User } = require("../../models");
const app = express();

mongoose.connect(
  "mongodb+srv://kimmingyu:%40aa19465369a@cluster0.umc0e.mongodb.net/test"
);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

require("./passport")();
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let corsOptions = {
  origin: "https://time-trackers.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(getUserFromJWT);

passport.serializeUser((user, done) => {
  console.log("serial?@@@@", user);
  return done(null, user.shortId);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});

app.get("/getuser", (req, res) => {
  // res.send(req.user);
  console.log("-----------@@@@@@@ 확인용 @@@@@@@@@--------", req.cookies);
  console.log("-----------@@@@@@@ 확인용 @@@@@@@@@--------", req);
  res.send(req.user);
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/time", timeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(3000, () => {
  console.log("Server Started!");
});

module.exports = app;
