import express from "express";
import * as plivo from "plivo";
import env from "./../config/env";

const router = express.Router();

//handle incoming post to start the conference

router.post("/", (req, res, next) => {
  try {
    //create plivo client instance
    var client = new plivo.Client(env.AUTH_ID, env.AUTH_TOKEN);

    //numbers array -- these numbers can also be sent in the post request body
    var volunteerNumbers = ["************", "************"];
    //decide the room name of the conference and make it a parameter in answer url
    var confRoomName = "************"; //this can be users number
    var userNumber = volunteerNumbers[0]; //first number in the array to be used as caller id
    var altNumber = volunteerNumbers[1]; //for user number because same number can't be both toNumber and fromNumber

    //having a unique answer_url per group makes it trivial to ensure members of the group join same conference room
    var answerUrl = `http://la-conference-demo.herokuapp.com/confanswerurl/${confRoomName}`;

    volunteerNumbers.forEach(number => {
      //trigger a call to each number in the array
      client.calls
        .create(
          number === userNumber ? altNumber : userNumber,
          number,
          answerUrl
        ) //if call attempt was successful then you would receive response from plivo
        .then(response => {
          console.log(`response from plivo will contain request uuid`);
          console.log(response);
        }) //if not then you'll get an error but next caller will be dialed
        .catch(err => {
          console.log(`this is error response from plivo`);
          console.log(err);
        });
    });
  } catch (error) {
    console.log(`catching error in creating the plivo client`);
    console.log(error);
    next(error);
  } finally {
    res.json({
      message: "received your request. will start making calls"
    });
  }
});

export default router;
