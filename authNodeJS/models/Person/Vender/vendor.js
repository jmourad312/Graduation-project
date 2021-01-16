const mongoose = require("mongoose");

var schema = mongoose.Schema;
var vendor = new schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  workshopSchedule: {
    openingTime: String,
    closingTime: String,
    closingDays: Array,
  },

  vendorSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorSubscription",
  },
  vendorFeedBack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorFeedBack",
  },

  banned: Boolean,
});

module.exports = mongoose.model("Vendor", vendor);
