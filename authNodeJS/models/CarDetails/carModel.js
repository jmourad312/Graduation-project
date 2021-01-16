const mongoose = require("mongoose");

var schema = mongoose.Schema;
var carModel = new schema({
  model: String,
  year: Number,
});

module.exports = mongoose.model("CarModel", carModel);
