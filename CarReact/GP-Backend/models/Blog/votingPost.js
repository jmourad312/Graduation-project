var mongoose = require("mongoose");

var schema = mongoose.Schema;
var voting = new schema(
  {
    upVoting: { type: Number, default: 0 },
    downVoting: { type: Number, default: 0 },
    personUpVoting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
    personDownVoting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
      },
    ],
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voting", voting);
