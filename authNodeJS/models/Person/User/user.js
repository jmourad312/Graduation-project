var mongoose = require("mongoose");

var schema = mongoose.Schema;
var juser = new schema({
  // onSale: Boolean,
  // price: {
  //     type: Number,
  //     required: function () { return this.onSale }
  // },
  //schema
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  userSubscription: {
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
