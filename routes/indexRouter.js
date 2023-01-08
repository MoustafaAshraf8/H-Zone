var express = require("express");
var indexRouter = express.Router();

/* GET home page. */
indexRouter.route("/").get((req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = indexRouter;
