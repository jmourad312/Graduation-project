const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfileCtrl = require("../../controller/User/userProfile-ctrl");
const userBlogCtrl = require("../../Controller/User/userBlog-ctrl");
const userItemCtrl = require("../../Controller/User/userItem-ctrl");
const userRateCtrl = require("../../Controller/User/userRate-ctrl");

const upload = require("../../middleware/upload").upload;
const User = require("../../models/Person/User/user");
const Vendor = require("../../models/Person/Vendor/vendor");
const Person = require("../../models/Person/person");

async function canView(req, resp, next) {
  const { role, _id } = req.user;

  const data = await Person.findOne({ _id: _id }, { banned: 1 });

  if (!((role == "user" && data.banned == false) || role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

async function canViewall(req, resp, next) {
  const { role, _id } = req.user;

  const data = await Person.findOne({ _id: _id }, { banned: 1 });

  if (
    !(
      (role == "user" && data.banned == false) ||
      role == "admin" ||
      (role == "vendor" && data.banned == false)
    )
  ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

async function validateUser(req, resp, next) {
  console.log(req.user);
  const { role, _id } = req.user;

  const data = await Person.findOne({ _id: _id }, { banned: 1 });

  if (
    !(
      (role == "user" &&
        (_id == req.params.id || _id == req.body.id) &&
        data.banned == false) ||
      role == "admin"
    )
  ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

// user routes on his profile
router.get(
  "/showUserProfile/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  upload.single("images"),
  userProfileCtrl.showUserProfile
);

router.put(
  "/updateUserPassword/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userProfileCtrl.updateUserPassword
);

router.put(
  "/updateUserProfile/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  upload.single("image"),
  userProfileCtrl.updateUserProfile
);

router.get(
  "/showUserDetails/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  upload.single("images"),
  userProfileCtrl.showUserDetails
);

// user routes on Blog
router.post(
  "/addPost",
  passport.authenticate("jwt", { session: false }),
  canView,
  upload.array("images", 5),
  userBlogCtrl.addNewPost
);

router.delete(
  "/deletePost/:id/:idperson?",
  passport.authenticate("jwt", { session: false }),
  canView,
  userBlogCtrl.deletePost
);

router.put(
  "/updatePost/:id/:idperson?",
  passport.authenticate("jwt", { session: false }),
  upload.array("images", 5),
  canView,
  userBlogCtrl.updatePost
);

router.get(
  "/showPostsOfUser/:id?",
  passport.authenticate("jwt", { session: false }),
  canView,
  userBlogCtrl.showPostsOfUser
);

// add comment or reply in comment
router.post(
  "/addComment/:idpost",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.addComment
);

router.post(
  "/addCommentReply/:idcomment",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.addCommentReply
);

router.delete(
  "/deleteComment/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.deleteComment
);

router.put(
  "/updateComment/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.updateComment
);

// show posts
router.post("/showFilterPosts/:skip", userBlogCtrl.showFilterPosts);

router.get("/showDetailsPost/:id", userBlogCtrl.showDetailsPost);

router.get("/showAllPosts", userBlogCtrl.showAllPosts);

//vote
router.post(
  "/upVoteToComment/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.upVoteToComment
);

router.post(
  "/downVoteToComment/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.downVoteToComment
);

//bookmarks
router.post(
  "/addPostToBookmarks",
  passport.authenticate("jwt", { session: false }),
  canView,
  userBlogCtrl.addBookmarks
);

router.get(
  "/showPostToBookmarks",
  passport.authenticate("jwt", { session: false }),
  canView,
  userBlogCtrl.getBookmarksList
);

// products
router.get(
  "/partOfItem",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userItemCtrl.partOfItem
);

router.get(
  "/showDetailsItem/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userItemCtrl.showDetailsItem
);

router.post(
  "/showRelatedItems",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userItemCtrl.showRelatedItems
);

router.post(
  "/showFilterItems/:skip",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userItemCtrl.showFilterItems
);

router.get(
  "/showVendorProfile/:id",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userItemCtrl.showVendorProfile
);

//recentlyViewed, Bookmark, Favourite

router.put(
  "/recentlyViewed",
  passport.authenticate("jwt", { session: false }),
  canView,
  userProfileCtrl.recentlyViewed
);

router.put(
  "/addBookmarkPosts",
  passport.authenticate("jwt", { session: false }),
  canView,
  userProfileCtrl.addBookmarkPosts
);

router.put(
  "/removeBookmarkPosts",
  passport.authenticate("jwt", { session: false }),
  canView,
  userProfileCtrl.removeBookmarkPosts
);

router.put(
  "/addFavouriteItems",
  passport.authenticate("jwt", { session: false }),
  canView,
  userProfileCtrl.addFavouriteItems
);

router.put(
  "/removeFavouriteItems",
  passport.authenticate("jwt", { session: false }),
  canView,
  userProfileCtrl.removeFavouriteItems
);

// feedback Item and vendor

router.post(
  "/writeFeedback",
  passport.authenticate("jwt", { session: false }),
  canView,
  userRateCtrl.writeFeedback
);
// {
//     comment:String,
//     rating:Number,
//     car:IDitem,
// }

// report
router.post(
  "/sendReport",
  passport.authenticate("jwt", { session: false }),
  canViewall,
  userBlogCtrl.sendReport
);

module.exports = router;
