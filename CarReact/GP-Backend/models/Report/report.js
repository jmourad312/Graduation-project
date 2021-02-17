const mongoose = require("mongoose");

var schema = mongoose.Schema;
var report = new schema({
  name: String,

});

module.exports = mongoose.model("Report", report);