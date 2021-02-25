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
  vendorItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  ],
});

module.exports = mongoose.model("Vendor", vendor);
