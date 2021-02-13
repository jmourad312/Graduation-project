const mongoose = require("mongoose");

var schema = mongoose.Schema;
var location = new schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  location: { 
    type: {
       type: String,
       default:"Point" 
    },
    coordinates: [Number],
    },
});

module.exports = mongoose.model("Location", location);
