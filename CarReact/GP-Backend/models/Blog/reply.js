const mongoose = require("mongoose");

var schema = mongoose.Schema;
var reply = new schema(
  {
    content: { type: String, required: true ,lowercase: true },
    image: String,
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentReply: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    vote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voting",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", reply);
