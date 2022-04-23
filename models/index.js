const mongoose = require("mongoose");

const TimeSchema = require("./schemas/time");

exports.Time = mongoose.model("Time", this.TimeSchema);
