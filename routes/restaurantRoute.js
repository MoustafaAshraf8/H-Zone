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

    var restOwnerName = req.body.OwnerName;
    var restOwnerEmail = req.body.OwnerEmail;
    var restOwnerPassword = req.body.OwnerPassword;
    var restOwnerPhone = req.body.OwnerPhone;
    var restName = req.body.restaurantName;
    var restLogo = req.body.restaurantLogo;
    var restMenu = req.body.restaurantMenu;
    var restSpecialization = req.body.restaurantSpecialization;
    console.log("1111111111111", restOwnerName, restSpecialization);

    var query = `Insert into Restaurant (restOwnerName, restOwnerEmail, restOwnerPassword, restOwnerPhone, restName, restLogo, restMenu, restSpecialization)
    Values
    ('${restOwnerName}', '${restOwnerEmail}', '${restOwnerPassword}', ${restOwnerPhone}, '${restName}', '${restLogo}', '${restMenu}', '${restSpecialization}');`;

    pool
      .query(query)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 403;
        res.send(
          "forbidden operation, you are not allowed to create a new restaurant account!! please contact the customer sevice."
        );
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

//__________________________________________________________________________________________________________________________________

restaurantRouter
  .route("/:restName")
  .get((req, res, next) => {
    const pool = new Pool({
      host: process.env.POSTGRESS_HOST,
      user: process.env.POSTGRESS_USER,
      port: process.env.POSTGRESS_PORT,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
    });

    var restName = req.params.restName.toLowerCase();
    var query = `select rest.restname as RestName, rest.restspecialization as special, rest.restlogo as logo, rest.restmenu as menu, meal.mealname as name, meal.mealprice as price, meal.mealpriceafter as priceafter, meal.mealoffer as offer, meal.mealdescription as description
    from Restaurant as rest, restMeal as meal
    where rest.restName = '${restName}' AND meal.restName = '${restName}';`;
    pool
      .query(query)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 404;
        res.send(
          "wrong restaurant name or restaurant not available anymore, try another one"
        );
      });
  })

  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("user post");
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

//__________________________________________________________________________________________________________________________________

restaurantRouter
  .route("/:restName/:mealName")
  .get((req, res, next) => {
    const pool = new Pool({
      host: process.env.POSTGRESS_HOST,
      user: process.env.POSTGRESS_USER,
      port: process.env.POSTGRESS_PORT,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DATABASE,
    });

    var restName = req.params.restName;
    var mealName = req.params.mealName;
    var query = `select rest.restname as RestName, rest.restspecialization as special, rest.restlogo as logo, rest.restmenu as menu, meal.mealname as name, meal.mealprice as price, meal.mealpriceafter as priceafter, meal.mealoffer as offer, meal.mealdescription as description
    from Restaurant as rest, restMeal as meal
    where rest.restName = '${restName}' AND meal.restName = '${restName}' AND meal.mealname = '${mealName}';`;
    pool
      .query(query)
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(result.rows);
      })
      .catch((err) => {
        res.statusCode = 404;
        res.send(
          "wrong meal name or meal not available anymore, try another one"
        );
      });
  })

  .post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send("user post");
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
