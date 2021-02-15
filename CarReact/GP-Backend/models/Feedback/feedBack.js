const mongoose = require("mongoose");

var schema = mongoose.Schema;
var feedback = new schema(
  {
    comment: { type: String, lowercase: true },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback",feedback);
