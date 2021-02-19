const mongoose = require("mongoose");

var schema = mongoose.Schema;
var post = new schema(
  {
    title: { type: String, required: true, lowercase: true },
    body: { type: String, required: true, lowercase: true },
    model: String,
    brand: String,
    state: { type: Boolean, default: false },
    images: [{type: String}] ,
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    reportPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
    updatedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
    numOfBookmarkPost: Number,
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", post);
