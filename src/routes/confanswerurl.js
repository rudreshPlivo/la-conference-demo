import express from "express";
import * as plivo from "plivo";

const router = express.Router();

//handle incoming post request from plivo on answer_url provided when making call
router.post("/:roomname", (req, res, next) => {
  //first get the conference room name so we can set it in the xml response
  var confRoomName = req.params.roomname;
  console.log(`this conference room name will be ${confRoomName}`);

  //understand if this request is for the moderator/leader because then we will respond with additional conference parameters

  console.log(`this is the information received for inbound request`);
  console.log(req.body);

  var isLeader = roomname == req.body.To;

  console.log(`leader is ${isLeader}`);

  //now prepare the XML --------

  //first speak text that will be played when members join conference
  var speakText = `Welcome. Please wait while we connect you to conference`;

  //now the conference parameters

  //conference callback url will also have the same parameterised url to make it easier to store join and leave events
  var confCallbackUrl = `https://la-conference-demo.herokuapp.com/confcallbackurl/${confRoomName}`;
  var confParams = {
    callbackUrl: confCallbackUrl,
    callbackMethod: "POST",
    StartConferenceOnEnter: isLeader,
    EndConferenceOnExit: isLeader,
    muted: !isLeader
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
    console.log(`error in sending back conference xml ${error}`);
    res.send({
      message: "someting went wrong in creating conference"
    });
  }
});

export default router;
