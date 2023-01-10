require("dotenv").config();
require("dotenv").config();
var express = require("express");
var bodyparser = require("body-parser");
const { Pool } = require("pg");
const { query } = require("express");
var HomePage = express.Router();

HomePage.use(bodyparser.json());

HomePage.route("/").get((req, res, next) => {
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
});

module.exports = HomePage;
