const mongoose = require("mongoose");

var schema = mongoose.Schema;
var carCollection= new schema({
    name: String,
    car: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
      }],
      
});


module.exports = mongoose.model("CarCollection",carCollection);;
