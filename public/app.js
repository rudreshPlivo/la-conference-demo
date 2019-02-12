"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _env = require("./config/env");

var _env2 = _interopRequireDefault(_env);

var _startconference = require("./routes/startconference");

var _startconference2 = _interopRequireDefault(_startconference);

var _confanswerurl = require("./routes/confanswerurl");

var _confanswerurl2 = _interopRequireDefault(_confanswerurl);

var _confcallbackurl = require("./routes/confcallbackurl");

var _confcallbackurl2 = _interopRequireDefault(_confcallbackurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//security headers
app.use((0, _helmet2.default)());

//basic logging to console
app.use((0, _morgan2.default)("combined"));

//parse incoming json and params
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

//configure routes

app.use("/startconference", _startconference2.default);
app.use("/confanswerurl", _confanswerurl2.default);
app.use("/confcallbackurl", _confcallbackurl2.default);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next(err);
});

//start listening
app.listen(_env2.default.PORT, function () {
  console.log("listening on port " + _env2.default.PORT);
});
//# sourceMappingURL=app.js.map