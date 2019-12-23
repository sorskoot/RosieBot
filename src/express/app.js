const express = require("express"),
  path = require("path"),
  //favicon = require('serve-favicon'),
  //logger = require("morgan"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  defaultRouter = require('./routes/defaultRoutes'),
  expressApp = express(),
  { app } = require('electron');
  console.log('My path:', app.getAppPath())

//view engine setup
expressApp.set("views", path.join(app.getAppPath(), '/bundled/views'));
expressApp.set('view engine', 'pug');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger("dev"));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(cookieParser());
expressApp.use(express.static(path.join(__dirname, "bundled")));

expressApp.use("/", defaultRouter);

//catch 404 and forward to error handler
expressApp.use(function(req, res, next) {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

//error handlers

//development error handler
//will print stacktrace
if (expressApp.get("env") === "development") {
  expressApp.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

//production error handler
//no stacktraces leaked to user
expressApp.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

export default expressApp;