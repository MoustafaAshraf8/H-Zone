var express = require("express");
var bodyparser = require("body-parser");
var userRouter = express.Router();

require("dotenv").config();
userRouter.use(bodyparser.json());

const { Pool } = require("pg");

//-------------------------------------------------------------------------------
userRouter
  .route("/")
  .get((req, res, next) => {
    const pool = new Pool({
      host: process.env.POSTGRESS_HOST,
      user: process.env.POSTGRESS_USER,
      port: process.env.POSTGRESS_PORT,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
    });
    pool
      .query("SELECT * FROM emp")
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 404;
        res.send("error, user not found");
      });
  })

  .post((req, res, next) => {
    const pool = new Pool({
      host: process.env.POSTGRESS_HOST,
      user: process.env.POSTGRESS_USER,
      port: process.env.POSTGRESS_PORT,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
    });
    pool
      .query("insert into emp values(8888, 'emp-8888@icloud.com')")
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 400;
        res.send("error, forbidden operation");
      });
  })
  .put((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("user put");
  })
  .delete((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("user delete");
  });

module.exports = userRouter;
