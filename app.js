var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var HomePage = require("./routes/HomePage");
var userRouter = require("./routes/userRouter");
var employeeRouter = require("./routes/employeeRouter");
var restaurantRouter = require("./routes/restaurantRoute");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", HomePage); //homepage
app.use("/user", userRouter); //user login(default), signup(optional)
app.use("/employee", employeeRouter);
app.use("/restaurant", restaurantRouter);
//app.use("restaurant", restaurantRouter.restaurantRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
