const mongoose = require("mongoose");

const TimeSchema = require("./schemas/time");
const UserSchema = require("./schemas/user");

exports.Time = mongoose.model("Time", TimeSchema);
exports.User = mongoose.model("User", UserSchema);
