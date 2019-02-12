import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import env from "./config/env";
import startconference from "./routes/startconference";
import answerurl from "./routes/confanswerurl";
import callbackurl from "./routes/confcallbackurl";

const app = express();

//security headers
app.use(helmet());

//basic logging to console
app.use(morgan("combined"));

//parse incoming json and params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure routes

app.use("/startconference", startconference);
app.use("/confanswerurl", answerurl);
app.use("/confcallbackurl", callbackurl);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next(err);
});

//start listening
app.listen(env.PORT, () => {
  console.log(`listening on port ${env.PORT}`);
});
