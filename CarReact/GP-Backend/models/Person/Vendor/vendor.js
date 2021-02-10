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
  vendorFeedBack: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeedBack",
  }],
  vendorItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  }],

  banned: {type:Boolean,default:false},
});

module.exports = mongoose.model("Vendor", vendor);
