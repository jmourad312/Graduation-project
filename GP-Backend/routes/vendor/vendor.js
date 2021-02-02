const express = require("express");
const router = express.Router();
const passport = require("passport");
const vendorItemCtrl = require("../../controller/Vendor/vendor'sItem-ctrl");
const vendorprofiileCtrl = require("../../controller/Vendor/vendor'sProfile-ctrl");


function canView(req, resp, next) {
  const { role } = req.user;
  if (!(role == "vendor" || role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

function validateVendor(req, resp, next) {
  console.log(req.user)
  const { role, _id} = req.user;
  if (! ( (role == "vendor" || role == "admin") && _id == req.params.id) ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

//router.get('/path',passport.authenticate('jwt', { session: false }),canView,nameOfFunction);
router.post("/add", passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.addItem);
router.get("/getItems",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.getItems);
router.get("/getItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.getOneItem);
router.put("/updateItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.updateItem);
router.delete("/deleteItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.deleteItem);
router.get("/numberOfItem",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.numberOfItem);
router.get("/partOfItem/:skip",passport.authenticate('jwt', { session: false }),canView,vendorItemCtrl.partOfItem);

router.put("/updateProfilePassword/:id",passport.authenticate('jwt', { session: false }),validateVendor,vendorprofiileCtrl.updateProfilePassword);
router.put("/updateProfile/:id",passport.authenticate('jwt', { session: false }),validateVendor,vendorprofiileCtrl.updateProfile);
router.put("/updateProfile/:id",passport.authenticate('jwt', { session: false }),validateVendor,vendorprofiileCtrl.updateProfile);
router.get('/showVendorProfile/:id',passport.authenticate('jwt', { session: false }),validateVendor,vendorprofiileCtrl.showVendorProfile);


router.post("/forgetPassword",vendorprofiileCtrl.forgetPassword);
router.post("/resetPassword",passport.authenticate('jwt', { session: false }),vendorprofiileCtrl.resetPassword)


module.exports = router;
