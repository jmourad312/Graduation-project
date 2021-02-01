const mongoose = require("mongoose");

var schema = mongoose.Schema;
var carType = new schema({
    name: String,
    car: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      }],
    carModel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarModel",
      }],
});

module.exports = mongoose.model("CarType", carType);
