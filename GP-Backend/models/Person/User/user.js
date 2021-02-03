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
<<<<<<< HEAD

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

=======
  banned: {type:Boolean,default:false},
  bookmarkPost:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }],
>>>>>>> bac14256cb416e7f8b639efeb222d2170b11061f
  //authentication
  facebookId: {
    type: Number,
  },
  googleId: {
    type: Number,
  },
});

module.exports = mongoose.model("User", user);
