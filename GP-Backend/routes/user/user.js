const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfileCtrl = require("../../controller/User/userProfile-ctrl");
const userBlogCtrl = require("../../Controller/User/userBlog-ctrl");

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
  if (! ( (role == "user" || role == "admin") && ( _id == req.params.id  || _id == req.body.id ) ) ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

// user routes on his profile
router.get("/showUserProfile/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userProfileCtrl.showUserProfile
);

router.put("/updateUserPassword/:id",passport.authenticate("jwt", { session: false }),validateUser,userProfileCtrl.updateUserPassword);

// user routes on Blog
router.post("/addPost",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.addNewPost);

router.delete("/deletePost/:id",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.deletePost);

router.put("/updatePost/:id",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.updatePost);

// add comment 
router.post("/addComment/:idpost",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.addComment);

router.post("/addCommentReply/:idcomment",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.addCommentReply);

//bookmarks routes
router.post("/addBookmarkList/:id",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.addBookmarks);
router.get("/showBookmarkList",passport.authenticate("jwt", { session: false }),canView,userBlogCtrl.getBookmarksList);

module.exports = router;
