import express from "express";

const router = express.Router();

//receive incoming updates on conference events
router.post("/:roomname", (req, res, next) => {
  //incoming messages will by default have conference room name so these events can be handled
  console.log(req.params.roomname); // can be used as primary key in table
  console.log(`event info when someone joins or leaves conference as json`);
  console.log(req.body); //this can be stored in db for reporting or info extracted and sent to client
});

export default router;
