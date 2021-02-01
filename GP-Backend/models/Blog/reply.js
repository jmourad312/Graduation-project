const mongoose = require("mongoose");

var schema = mongoose.Schema;
var reply = new schema({
    content: String,
    image: [String],
    createdAT: Date,
    updatedAT: Date,
    commentVoting: Number,
    commentReply: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reply"
        }
      ],
   
});


module.exports = mongoose.model("Reply",reply);
