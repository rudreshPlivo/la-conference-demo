"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//receive incoming updates on conference events
router.post("/:roomname", function (req, res, next) {
  //incoming messages will by default have conference room name so these events can be handled
  console.log(req.params.roomname); // can be used as primary key in table
  console.log("event info when someone joins or leaves conference as json");
  console.log(req.body); //this can be stored in db for reporting or info extracted and sent to client
});

exports.default = router;
//# sourceMappingURL=confcallbackurl.js.map