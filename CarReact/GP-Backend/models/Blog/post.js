const mongoose = require("mongoose");

var schema = mongoose.Schema;
var post = new schema(
  {
    title: String,
    body: String,
    model: String,
    brand: String,
    state: { type: Boolean, default: false },
    images: [{ type: String }],
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", post);

// {
//   model: {
//     $elemMatch: {
//       $or: [{ model: "" }, { model: req.body.model }];
//     }
//   }
// }
