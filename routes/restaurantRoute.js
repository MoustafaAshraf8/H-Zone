var express = require("express");
var bodyparser = require("body-parser");
var restaurantRouter = express.Router();

require("dotenv").config();
restaurantRouter.use(bodyparser.json());

const { Pool } = require("pg");

//-------------------------------------------------------------------------------
restaurantRouter
  .route("/")
  .get((req, res, next) => {
    const pool = new Pool({
      host: process.env.POSTGRESS_HOST,
      user: process.env.POSTGRESS_USER,
      port: process.env.POSTGRESS_PORT,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
    });

    if (!req.query.sort) {
      var query = `select restname as name, restspecialization as special, restlogo as logo, restmenu as menu from restaurant;`;
    } else {
      var sort = req.query.sort;
      var query = `select restname as name, restspecialization as special, restlogo as logo, restmenu as menu from restaurant where restspecialization = '${sort}';`;
    }

    pool
      .query(query)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 404;
        res.send(err);
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
    var id = req.body.empid;
    var email = req.body.empemail;
    console.log(id, email);
    pool
      .query(`insert into emp values(${id}, '${email}')`)
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
module.exports = restaurantRouter;
