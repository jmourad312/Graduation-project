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
    closingDays: [String],
  },

  vendorSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorSubscription",
  },
  vendorFeedBack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VendorFeedBack",
  },

  banned: {type:Boolean,default:false},
});

module.exports = mongoose.model("Vendor", vendor);
