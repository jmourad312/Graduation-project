const mongoose = require("mongoose");

var schema = mongoose.Schema;
var post = new schema({
  title: String,
  body: String,
  image: [],
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  updatedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ],
}
  , { timestamps: true },
);


module.exports = mongoose.model("Post", post);
