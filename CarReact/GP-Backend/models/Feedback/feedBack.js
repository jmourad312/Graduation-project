const mongoose = require("mongoose");

var schema = mongoose.Schema;
var feedBack = new schema({
  comment: String,
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
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
}
  , { timestamps: true },
);

module.exports = mongoose.model("FeedBack ", feedBack);
