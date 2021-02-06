const mongoose = require("mongoose");

var schema = mongoose.Schema;
var car = new schema({

  name: { type: String, required: true },
  price: Number,
  description: String,
  available: Boolean,
  case: String,
  image: String,
  itemFeedBack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemFeedBack",
  }],
  carBrand: String,
  carModel: String,
  itemCollection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCollection",
  },
  person:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  }

});

module.exports = mongoose.model("Car", car);
