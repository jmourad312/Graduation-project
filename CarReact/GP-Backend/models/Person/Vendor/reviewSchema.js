const mongoose = require("mongoose");

var schema = mongoose.Schema;
var vendorFeedBack = new schema({
  comment: String,
  rating: {
    type: Number,
    default: 0,
    min: 1,
    max: 5,
    validate: { validator: Number.isInteger },
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
});

module.exports = mongoose.model("VendorFeedBack", vendorFeedBack);
