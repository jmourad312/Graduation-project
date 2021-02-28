const mongoose = require("mongoose");

var schema = mongoose.Schema;

var chatroom = new schema(
  {
    name: [String, String],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatMessage",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoom", chatroom);
