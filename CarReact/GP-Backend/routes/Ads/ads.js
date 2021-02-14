const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middleware/upload").upload;
const AdminCtrl = require("../../Controller/Ads/admin-ads-ctrl");
const userCtrl = require ("../../Controller/Ads/user-ads-ctrl")

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

function validateAdmin(req, resp, next) {
  console.log(req.user);
  const { role, _id } = req.user;
  if (!(role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

router.post("/admin/addAds",passport.authenticate("jwt", { session: false }), validateAdmin, upload.array("images", 5), AdminCtrl.addAds);
router.delete("/admin/deleteAds/:id",passport.authenticate("jwt", { session: false }), validateAdmin, AdminCtrl.deleteAds);
router.get ("/admin/showVAds/:skip",passport.authenticate("jwt", { session: false }), canViewall, AdminCtrl.showVAds)



router.get ("/showAds",passport.authenticate("jwt", { session: false }), canViewall, userCtrl.showAds)

module.exports = router;
