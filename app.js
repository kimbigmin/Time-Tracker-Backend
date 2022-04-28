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
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(getUserFromJWT);

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
  res.render("error");
});

module.exports = app;
