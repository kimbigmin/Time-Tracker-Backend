const { Schema } = require("mongoose");

const TimeSchema = new Schema(
  {
    date: Date,
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
