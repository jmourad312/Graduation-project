const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  avgRate:{ type: Number,default:0},
  available: Boolean,
  case: String,
  images: [String],
  feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
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

