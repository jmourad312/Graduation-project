const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  available: Boolean,
  case: String,
  image: String,
  itemFeedBack: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeedBack",
    },
  ],
  carBrand: String,
  carModel: String,
  itemCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCollection",
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

module.exports = mongoose.model("Car", car);

