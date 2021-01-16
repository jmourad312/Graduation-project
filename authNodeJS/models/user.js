var mongoose = require("mongoose");

var schema = mongoose.Schema;
var user = new schema({
  facebookId:{
    type: Number,
  },
  googleId: {
    type: Number,
  },
  UserName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Role: {
    type: String,
    default: "user",
  }

});


module.exports = mongoose.model("User", user);