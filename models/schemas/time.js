const { Schema } = require("mongoose");
const shortId = require("./types/short-id");

const TimeSchema = new Schema(
  {
    shortId,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: String,
    improveTime: {
      study: String,
      workout: String,
      reading: String,
      rest: String,
    },
    private: {
      privates: String,
      game: String,
    },
    sleeping: {
      night: String,
      nap: String,
      wake: String,
      sleep: String,
    },
    working: {
      works: String,
      houseWork: String,
    },
    entireTime: {
      entireImprove: String,
      entirePrivate: String,
      entireWorks: String,
      entireSleep: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = TimeSchema;
