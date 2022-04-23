const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const { Time } = require("./models");

const timeRouter = require("./routes/time");
const usersRouter = require("./routes/users");

const app = express();

mongoose.connect(
  "mongodb+srv://kimmingyu:%40aa19465369a@cluster0.umc0e.mongodb.net/test"
);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.listen(8080);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/time", timeRouter);
app.use("/users", usersRouter);

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
