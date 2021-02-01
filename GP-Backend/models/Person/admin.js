const mongoose = require("mongoose");

var schema = mongoose.Schema;
var admin = new schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

module.exports = mongoose.model("Admin", admin);
