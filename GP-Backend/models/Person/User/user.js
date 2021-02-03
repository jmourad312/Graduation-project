var mongoose = require("mongoose");

var schema = mongoose.Schema;
var user = new schema({

  //schema
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  userSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSubscription",
  },
  banned: {type:Boolean,default:false},
  bookmarkPost:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }],
  //authentication
  facebookId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
});

module.exports = mongoose.model("User", user);
