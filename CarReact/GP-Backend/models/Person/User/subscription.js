const mongoose = require("mongoose");

var schema = mongoose.Schema;
var userSubscription = new schema({
  type: { type: String, enum: ["free", "premiere", "pro"], default: "free" },
  createdAt: Date,
  endAt: Date,

});

module.exports = mongoose.model("UserSubscription", userSubscription);
