const mongoose = require("mongoose");

var schema = mongoose.Schema;
var post = new schema({
    title: String,
    body: String,
    image: [],
    createdAT: Date,
    updatedAT: Date,
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
});


module.exports = mongoose.model("Post",post);
