const mongoose = require("mongoose");

var schema = mongoose.Schema;
var reply = new schema({
<<<<<<< HEAD
  content:{
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
=======
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
>>>>>>> 8b854073a3efd5023ea63c54a29db7a4d718180b

});

module.exports = mongoose.model("Reply", reply);
