var mongoose = require("mongoose");

var schema = mongoose.Schema;
var juser = new schema({
  //schema
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  vendorSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSubscription",
  },
  banned: Boolean,

  //authentication
  facebookId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
});

module.exports = mongoose.model("jUser", juser);
