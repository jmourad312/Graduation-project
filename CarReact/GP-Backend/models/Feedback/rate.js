const mongoose = require("mongoose");

var schema = mongoose.Schema;
var rate = new schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      validate: { validator: Number.isInteger },
    },
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

module.exports = mongoose.model("Rate",rate);
