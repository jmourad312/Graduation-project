var mongoose = require("mongoose");

var schema = mongoose.Schema;
var bookmarkSchema = new schema({
  type: [Number],
  
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },

});

module.exports = mongoose.model("BookmarksList", bookmarkSchema);
