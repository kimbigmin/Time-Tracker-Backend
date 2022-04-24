var express = require("express");
var router = express.Router();
const { User } = require("../models");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  const post = new User.create({
    useId: "test",
    timeData: [
      {
        id: 1,
        date: "2021.12.24",
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
      },
    ],
  });

  res.json(post);
});

module.exports = router;
