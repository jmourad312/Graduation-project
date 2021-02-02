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
  const { role, _id } = req.user;
  if (!((role == "user" || role == "admin") && _id == req.params.id)) {
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
  userProfileCtrl.showUserProfile
);

router.put(
  "/updateUserPassword/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userProfileCtrl.updateUserPassword
);

// user routes on Blog
router.post(
  "/addPost/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userBlogCtrl.addNewPost
);
router.delete(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userBlogCtrl.deletePost
);
router.put(
  "/updatePost/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userBlogCtrl.updatePost
);

// add comment 
router.put(
  "/addComment/:id",
  passport.authenticate("jwt", { session: false }),
  validateUser,
  userBlogCtrl.addComment
);
module.exports = router;
