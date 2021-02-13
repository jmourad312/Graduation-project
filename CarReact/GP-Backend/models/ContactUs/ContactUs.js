const mongoose = require("mongoose");

var schema = mongoose.Schema;
var contactus = new schema(
  {
    email: { type: String, lowercase: true, required:true},
    message: { type: String, lowercase: true, required:true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contactus",contactus);
