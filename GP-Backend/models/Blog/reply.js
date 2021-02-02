const mongoose = require("mongoose");

var schema = mongoose.Schema;
var reply = new schema({
    content: String,
    image: [String],
    commentVoting: Number,
    commentReply: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reply"
        }
      ],
   
}
, { timestamps: true },
);


module.exports = mongoose.model("Reply",reply);
