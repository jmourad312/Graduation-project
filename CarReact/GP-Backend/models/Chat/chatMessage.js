const mongoose = require("mongoose");

const chatmessage = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("ChatMessage", chatmessage);
