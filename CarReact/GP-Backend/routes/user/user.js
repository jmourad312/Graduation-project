const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfileCtrl = require("../../controller/User/userProfile-ctrl");
const userBlogCtrl = require("../../Controller/User/userBlog-ctrl");
const userItemCtrl = require ('../../Controller/User/userItem-ctrl');
const upload =require ('../../middleware/upload').upload;

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

function validateUser(req, resp, next) {
  console.log(req.user)
  const { role, _id } = req.user;
  if (!((role == "user" || role == "admin") && (_id == req.params.id || _id == req.body.id))) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

// user routes on his profile
router.get("/showUserProfile/:id", passport.authenticate("jwt", { session: false }), validateUser, upload.single("images"),userProfileCtrl.showUserProfile);

router.put("/updateUserPassword/:id", passport.authenticate("jwt", { session: false }), validateUser, userProfileCtrl.updateUserPassword);

router.put("/updateUserProfile/:id", passport.authenticate("jwt", { session: false }), validateUser, userProfileCtrl.updateUserProfile);

// user routes on Blog
router.post("/addPost", passport.authenticate("jwt", { session: false }), canView ,upload.array("images",10),userBlogCtrl.addNewPost);

router.delete("/deletePost/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.deletePost);

router.put("/updatePost/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.updatePost);

// add comment or reply in comment 
router.post("/addComment/:idpost", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.addComment);

router.post("/addCommentReply/:idcomment", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.addCommentReply);

// show posts
router.post("/showFilterPosts", userBlogCtrl.showFilterPosts)

router.get("/showDetailsPost/:id", userBlogCtrl.showDetailsPost)

router.get("/showAllPosts", userBlogCtrl.showAllPosts)

router.get("/showPostsOfUser", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.showPostsOfUser)


//vote 
router.post("/voteToComment/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.voteToComment);

router.delete("/removeVoteFromComment/:id", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.removeVoteFromComment);

router.get("/numberOfVoting/:id", userBlogCtrl.numberOfVoting);

//bookmarks 
router.post("/addPostToBookmarks", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.addBookmarks);

router.get("/showPostToBookmarks", passport.authenticate("jwt", { session: false }), canView, userBlogCtrl.getBookmarksList);

// products 
router.get("/partOfItem", passport.authenticate("jwt", { session: false }), canView, userItemCtrl.partOfItem);

router.get("/showDetailsItem/:id", passport.authenticate("jwt", { session: false }), canView, userItemCtrl.showDetailsItem);


router.post("/showFilterItems", passport.authenticate("jwt", { session: false }), canView,userItemCtrl.showFilterItems);



module.exports = router;
