const mongoose = require("mongoose");

var schema = mongoose.Schema;
var reply = new schema({
  content:
  {
        type:"String",
        default:""
  } 
  image: [String],
  createdAT: Date,
  updatedAT: Date,
  commentVoting: Number,
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  commentReply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],

});

module.exports = mongoose.model("Reply", reply);
