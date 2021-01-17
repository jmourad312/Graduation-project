const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({
  name: String,
  price: String,
  description: String,
  available: Boolean,
  case: String,
  image: [],
  itemFeedBack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemFeedBack",
  }],
  carType: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarType",
  }],
  carCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarCollection",
  },
});

module.exports = mongoose.model("Car", car);
