const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const timeRouter = require("./routes/time");
const passport = require("passport");
const cors = require("cors");
// const getUserFromJWT = require("./middlewares/get-user-from-jwt");
const session = require("express-session");
const { User } = require("./models");
const app = express();

mongoose.connect(
  `mongodb+srv://kimmingyu:%40aa19465369a@cluster0.umc0e.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

require("./passport")();
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secretcode"));

let corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.set("trust proxy", 1);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(getUserFromJWT);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc);
  });
});

app.use("/auth", authRouter);
app.use("/time", timeRouter);

app.get("/getuser", (req, res) => {
  res.send(req.user);
});

app.get("/", (req, res) => {
  res.send("hi");
});

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

module.exports = app;
