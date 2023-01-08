var express = require("express");
var bodyparser = require("body-parser");
var employeeRouter = express.Router();

employeeRouter.use(bodyparser.json());

employeeRouter
  .route("/")
  .get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("employee get");
  })
  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("employee post");
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("employee put");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("employee delete");
  });

module.exports = employeeRouter;
