const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfileCtrl = require("../../controller/User/userProfile-ctrl");
const userBlogCtrl = require("../../Controller/User/userBlog-ctrl");
const userItemCtrl = require('../../Controller/User/userItem-ctrl');
const userRateCtrl = require('../../Controller/User/userRate-ctrl');

const upload = require('../../middleware/upload').upload;

function canView(req, resp, next) {
  const { role } = req.user;
  if (!(role == "user" || role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

function canViewall(req, resp, next) {
  const { role } = req.user;
  if (!(role == "user" || role == "admin" || role == "vendor")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

function validateUser(req, resp, next) {
  console.log(req.user)
  const { role, _id } = req.user;
  //!((role == "user" || role == "admin") && (_id == req.params.id || _id == req.body.id))

  if (!( (role == "user" && (_id == req.params.id || _id == req.body.id) ) || (role == "admin"))) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

// user routes on his profile
router.get("/showUserProfile/:id", passport.authenticate("jwt", { session: false }), validateUser, upload.single("images"), userProfileCtrl.showUserProfile);

router.put("/updateUserPassword/:id", passport.authenticate("jwt", { session: false }), validateUser, userProfileCtrl.updateUserPassword);

router.put("/updateUserProfile/:id", passport.authenticate("jwt", { session: false }), validateUser, upload.single("image"), userProfileCtrl.updateUserProfile);

// user routes on Blog
router.post("/addPost", passport.authenticate("jwt", { session: false }), canView, upload.single("image"), userBlogCtrl.addNewPost);

router.delete("/deletePost/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.deletePost);

router.put("/updatePost/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.updatePost);

router.get("/showPostsOfUser", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.showPostsOfUser);

// add comment or reply in comment 
router.post("/addComment/:idpost", passport.authenticate("jwt", { session: false }), canViewall, userBlogCtrl.addComment);

router.post("/addCommentReply/:idcomment", passport.authenticate("jwt", { session: false }), canViewall, userBlogCtrl.addCommentReply);

// show posts
router.post("/showFilterPosts", userBlogCtrl.showFilterPosts)

router.get("/showDetailsPost/:id", userBlogCtrl.showDetailsPost)

router.get("/showAllPosts", userBlogCtrl.showAllPosts)


//vote 
router.post("/voteToComment/:id", passport.authenticate("jwt", { session: false }), canViewall, userBlogCtrl.voteToComment);

router.delete("/removeVoteFromComment/:id", passport.authenticate("jwt", { session: false }), canViewall, userBlogCtrl.removeVoteFromComment);

//bookmarks 
router.post("/addPostToBookmarks", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.addBookmarks);

router.get("/showPostToBookmarks", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.getBookmarksList);

// products 
router.get("/partOfItem", passport.authenticate("jwt", { session: false }), canViewall, userItemCtrl.partOfItem);

router.get("/showDetailsItem/:id", passport.authenticate("jwt", { session: false }), canViewall, userItemCtrl.showDetailsItem);

router.post("/showFilterItems", passport.authenticate("jwt", { session: false }), canViewall, userItemCtrl.showFilterItems);

router.get("/showVendorProfile/:id", passport.authenticate("jwt", { session: false }), canViewall, userItemCtrl.showVendorProfile);

//recentlyViewed, Bookmark, Favourite

router.put("/recentlyViewed", passport.authenticate("jwt", { session: false }), canView, userProfileCtrl.recentlyViewed)

router.put("/addBookmarkPosts", passport.authenticate("jwt", { session: false }), canView, userProfileCtrl.addBookmarkPosts)

router.put("/removeBookmarkPosts", passport.authenticate("jwt", { session: false }), canView, userProfileCtrl.removeBookmarkPosts)

router.put("/addFavouriteItems", passport.authenticate("jwt", { session: false }), canView, userProfileCtrl.addFavouriteItems)

router.put("/removeFavouriteItems", passport.authenticate("jwt", { session: false }), canView, userProfileCtrl.removeFavouriteItems)




// feedback Item and vendor

router.post("/writeFeedback", passport.authenticate("jwt", { session: false }), canView, userRateCtrl.writeFeedback);
// {
//     comment:String,
//     rating:Number,
//     car:IDitem,
//     vendor:IDperson   
// }



router.delete("/removeFeedback/:id", passport.authenticate("jwt", { session: false }), canView, userRateCtrl.removeFeedback);
// params => idfeedback


module.exports = router;
