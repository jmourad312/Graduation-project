var mongoose = require("mongoose");

var schema = mongoose.Schema;
var voting = new schema(
  {
    numberOfVoting: { type: Number, default: 0 },
    person: [
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
