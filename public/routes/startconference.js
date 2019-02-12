"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _plivo = require("plivo");

var plivo = _interopRequireWildcard(_plivo);

var _env = require("./../config/env");

var _env2 = _interopRequireDefault(_env);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//handle incoming post to start the conference

router.post("/", function (req, res, next) {
  try {
    //create plivo client instance
    var client = new plivo.Client(_env2.default.AUTH_ID, _env2.default.AUTH_TOKEN);

    //numbers array -- these numbers can also be sent in the post request body
    var volunteerNumbers = ["*********", "************"];
    //decide the room name of the conference and make it a parameter in answer url
    var confRoomName = "***********"; //this can be users number
    var userNumber = volunteerNumbers[0]; //first number in the array to be used as caller id
    var altNumber = volunteerNumbers[1]; //for user number because same number can't be both toNumber and fromNumber

    //having a unique answer_url per group makes it trivial to ensure members of the group join same conference room
    var answerUrl = "http://la-conference-demo.herokuapp.com/confanswerurl/" + confRoomName;

    volunteerNumbers.forEach(function (number) {
      //trigger a call to each number in the array
      client.calls.create(number === userNumber ? altNumber : userNumber, number, answerUrl) //if call attempt was successful then you would receive response from plivo
      .then(function (response) {
        console.log("response from plivo will contain request uuid");
        console.log(response);
      }) //if not then you'll get an error but next caller will be dialed
      .catch(function (err) {
        console.log("this is error response from plivo");
        console.log(err);
      });
    });
  } catch (error) {
    console.log("catching error in creating the plivo client");
    console.log(error);
    next(error);
  } finally {
    res.json({
      message: "received your request. will start making calls"
    });
  }
});

exports.default = router;
//# sourceMappingURL=startconference.js.map