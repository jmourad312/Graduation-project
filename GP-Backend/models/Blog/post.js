const mongoose = require("mongoose");

var schema = mongoose.Schema;
var post = new schema({
<<<<<<< HEAD
    title: String,
    body: String,
    image: [],
    createdAT: Date,
    updatedAT: Date,
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
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
=======
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
>>>>>>> 8b854073a3efd5023ea63c54a29db7a4d718180b


module.exports = mongoose.model("Post", post);
