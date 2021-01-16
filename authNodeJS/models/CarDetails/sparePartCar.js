const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({
  name: String,
  price: String,
  description: String,
  available: boolean,
  case: String,
  image: [],
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
  },
  itemFeedBack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemFeedBack",
  }],
  carType: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarType",
  }],
});

module.exports = mongoose.model("Car", car);
