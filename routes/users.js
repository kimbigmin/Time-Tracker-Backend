var express = require("express");
var router = express.Router();
const { User, Time } = require("../models");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  const post = Time.create({
    date: "2021.13.24",
    improveTime: {
      study: "2:10",
      workout: "2:10",
      reading: "3:10",
      rest: "2:10",
    },
    private: {
      privates: "",
      game: "",
    },
    sleeping: {
      night: "",
      nap: "",
      wake: "",
      sleep: "",
    },
    working: {
      works: "",
      houseWork: "",
    },
    entireTime: {
      entireImprove: "9:40",
      entirePrivate: "0:0",
      entireWorks: "0:0",
      entireSleep: "0:0",
    },
  });

  res.json(post);
});

router.get("/getTest", async function (req, res, next) {
  const posts = await User.find({});

  res.json(posts);
});

module.exports = router;
