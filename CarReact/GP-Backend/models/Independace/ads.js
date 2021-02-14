const mongoose = require("mongoose");

var schema = mongoose.Schema;
var ads = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true, lowercase: true },
  createdAT: Date,
  expired: Date,
  duration: { type: Number, default: 10 },
  price: { type: Number, required: true },
  ownerName: String,
  ownerPhone: Number,
  ownerEmail: String,

  images: [{ type: String, required: true }],
});

module.exports = mongoose.model("Ad", ads);
