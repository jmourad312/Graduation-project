const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  available: Boolean,
  case: String,
  images: [String],
  feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
    },
  ],
  rate: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rate",
    },
  ],
  carBrand: String,
  carModel: String,
  itemCollection: String,
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  numOfFavoriteItem: Number,
});

module.exports = mongoose.model("Car", car);

