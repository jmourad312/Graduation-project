var mongoose = require("mongoose");

var schema = mongoose.Schema;
var user = new schema({
  //schema

  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },

  userSubscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSubscription",
  },

  favouriteItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FavouriteItems",
    },
  ],

  bookmarkPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookmarkPosts",
    },
  ],

  banned: { type: Boolean, default: false },

  //authentication
  facebookId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
});

module.exports = mongoose.model("User", user);
