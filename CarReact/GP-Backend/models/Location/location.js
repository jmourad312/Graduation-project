const mongoose = require("mongoose");

var schema = mongoose.Schema;
var location = new schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  region: {
    country: { type: String, default: "Egypt" },
    region: { type: String, required: true },
    place: [
      {
        city: String,
        address: String,
      },
    ],
  },
});

module.exports = mongoose.model("Location", location);
