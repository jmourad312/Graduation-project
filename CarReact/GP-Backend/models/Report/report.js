const mongoose = require("mongoose");

var schema = mongoose.Schema;
var report = new schema({
  idBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  message:String
});

module.exports = mongoose.model("Report", report);