"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _plivo = require("plivo");

var plivo = _interopRequireWildcard(_plivo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//handle incoming post request from plivo on answer_url provided when making call
router.post("/:roomname", function (req, res, next) {
  //first get the conference room name so we can set it in the xml response
  var confRoomName = req.params.roomname;
  console.log("this conference room name will be " + confRoomName);

  //now prepare the XML --------

  //first speak text that will be played when members join conference
  var speakText = "Welcome. Please wait while we connect you to conference";

  //now the conference parameters

  //conference callback url will also have the same parameterised url to make it easier to store join and leave events
  var confCallbackUrl = "https://la-conference-demo.herokuapp.com/confcallbackurl/" + confRoomName;
  var confParams = {
    callbackUrl: confCallbackUrl,
    callbackMethod: "POST"
  };

  //now create response xml using plivo sdk's xml generator
  var response = plivo.Response();

  //add the elements - in order - of execution first speech then conference

  response.addSpeak(speakText); //this will be played first
  response.addConference(confRoomName, confParams); // now we don't need to know who is supposed to join which conference.

  console.log(response.toXML()); //see the xml that will be sent..just logging

  //send back the xml - easy part
  try {
    res.type("application/xml");
    res.send(response.toXML());
  } catch (error) {
    console.log("error in sending back conference xml " + error);
    res.send({
      message: "someting went wrong in creating conference"
    });
  }
});

exports.default = router;
//# sourceMappingURL=confanswerurl.js.map