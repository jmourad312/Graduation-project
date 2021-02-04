const mongoose = require("mongoose");

var schema = mongoose.Schema;
var carbrand = new schema({
    name: String,
    carModel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarModel",
      }],
});

module.exports = mongoose.model("CarBrand", carbrand);
