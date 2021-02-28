const express = require("express");
const router = express.Router();
const passport = require("passport");

const userChatCtrl = require("../../Controller/Chat/chat-ctrl");
const Person = require("../../models/Person/person");
const upload = require("../../middleware/upload").upload;

async function canViewall(req, resp, next) {
  const { role, _id } = req.user;

  const data = await Person.findOne({ _id: _id }, { banned: 1 });

  if (
    !(
      (role == "user" && data.banned == false) ||
      role == "admin" ||
      (role == "vendor" && data.banned == false)
    )
  ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

router.post(
  "/sendMessage",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 5),
  canViewall,
  userChatCtrl.sendMessage
);

module.exports = router;
