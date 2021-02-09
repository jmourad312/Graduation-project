const person = require("../../models/Person/person");
const user = require("../../models/Person/User/user");
const userSubscription = require("../../models/Person/User/subscription");
const bcrypt = require("bcryptjs");

//User info (show info - update info)

// 1- show info
showUserProfile = (req, res) => {
  const IdPerson = req.params.id;
  const populateQuery = [
    {
      path: "person",
      select:
        "-subscribe -role -password -createdAt -updatedAt -__v -_id -codeToResetPassword",
    },
    { path: "userSubscription", select: "-__v -_id" },

    { path: "postsUser", select: "-__v -comment -updatedPosts" },

    { path: "favouriteItems", populate: { path: "person", select: "firstName" }  ,select: "-__v -comment -updatedPosts" },

    { path: "bookmarkPosts", populate: { path: "person", select: "firstName" }  , select: "-__v -comment -updatedPosts" },

    { path: "recentlyViewed", populate: { path: "person", select: "firstName" }  , select: "-__v" },

  ];
  user
    .findOne(
      { person: IdPerson },
      { facebookId: 0, googleId: 0, __v: 0, _id: 0 }
    )
    .populate(populateQuery)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          Data: err,
          Message: "*****************",
          Success: false,
        });
      } else {
        return res.status(200).json({
          Data: data,
          Message: ":D :D",
          Success: true,
        });
      }
    });
};

//update info
updateUserProfile = async (req, res) => {

  const body = JSON.parse(JSON.stringify(req.body));

  const saltRounds = await bcrypt.genSalt(10);

  const update = {};

  if (req.body.password) {
    update.password = await bcrypt.hash(req.body.password, saltRounds);
  }
  if (req.file) {
    update.image = "http://localhost:3000/images/" + req.file.filename;
  }

  person.updateOne(
    { _id: req.params.id },
    { ...body, ...update },
    { upsert: true, new: true },
    (error, data) => {
      if (error) {
        return res.json({
          Data: null,
          Message: "You can't update" + error,
          Success: false,
        });
      } else {
        return res.json({
          Data: data.n,
          Message: "updated",
          Success: true,
        });
      }
    }
  );
};

//update password
updateUserPassword = async (req, res) => {
  const saltRounds = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltRounds);

  person.updateOne(
    { _id: req.params.id },
    { password: password },
    { upsert: true, new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          Data: null,
          Message: "You can't update your password",
          Success: false,
        });
      } else {
        return res.status(200).json({
          Data: data.n,
          Message: "your password updated ",
          Success: true,
        });
      }
    }
  );
};

recentlyViewed = (req, res) => {

  user.updateOne({ person: req.user._id }, {
    $push: {
      recentlyViewed: {
        $each: [req.body.id],
        $slice: -5
      }
    }

  }, (error, data) => {
    if (error) {
      return res.json({
        Data: error,
        Message: "can't add to Recent view",
        Success: true,
      });
    }
    return res.json({
      Data: data.n,
      Message: "Done add to Recent view",
      Success: true,
    });
  });
}

addBookmarkPosts = async (req, res) => {

  const PostAtBookmark = await user.find({ bookmarkPosts: { $in: req.body.id }, person: req.user._id })

  // console.log(PostAtBookmark)
  
  // if (PostAtBookmark) {
  //   return res.json({
  //     Data: null,
  //     Message: "You already add to bookmark",
  //     Success: false,
  //   });
  // }


  user.updateOne({ person: req.user._id }, {
    $push: {
      bookmarkPosts: req.body.id,
    }
  }

    , (error, data) => {
      if (error) {
        return res.json({
          Data: error,
          Message: "can't add to Recent view",
          Success: true,
        });
      }
      return res.json({
        Data: data.n,
        Message: "Done add to Recent view",
        Success: true,
      });
    });

}

removeBookmarkPosts = (req, res) => {

  user.updateOne({ person: req.user._id }, {
    $pull: {
      bookmarkPosts: req.body.id,
    }
  }

    , (error, data) => {
      if (error) {
        return res.json({
          Data: error,
          Message: "can't add to Recent view",
          Success: true,
        });
      }
      return res.json({
        Data: data.n,
        Message: "Done add to Recent view",
        Success: true,
      });
    });

}

addFavouriteItems = async (req, res) => {

  const ItemAddToFavourite = await user.find({ favouriteItems: { $in: req.body.id }, person: req.user._id })
  console.log(ItemAddToFavourite)
  if (ItemAddToFavourite.length !== 0) {
    return res.json({
      Data: null,
      Message: "You already add to favourite",
      Success: false,
    });
  }




  user.updateOne({ person: req.user._id }, {
    $push: {
      favouriteItems: req.body.id,
    }
  }

    , (error, data) => {
      if (error) {
        return res.json({
          Data: error,
          Message: "can't add to Recent view",
          Success: true,
        });
      }
      return res.json({
        Data: data.n,
        Message: "Done add to Recent view",
        Success: true,
      });
    });
}

removeFavouriteItems = (req, res) => {
  user.updateOne({ person: req.user._id }, {
    $pull: {
      favouriteItems: req.body.id,
    }
  }

    , (error, data) => {
      if (error) {
        return res.json({
          Data: error,
          Message: "can't add to Recent view",
          Success: true,
        });
      }
      return res.json({
        Data: data.n,
        Message: "Done add to Recent view",
        Success: true,
      });
    });
}

module.exports = {
  showUserProfile, updateUserProfile, updateUserPassword,
  recentlyViewed, addBookmarkPosts, removeBookmarkPosts, addFavouriteItems, removeFavouriteItems
};
