const { Schema } = require("mongoose");
const { Time } = require("../index");

const UserSchema = new Schema(
  {
    userId: String,
    timeData: {
      type: Object,
      ref: "Time",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
