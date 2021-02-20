const express = require("express");
const router = express.Router();
const passport = require("passport");
const vendorItemCtrl = require("../../controller/Vendor/vendor'sItem-ctrl");
const vendorprofiileCtrl = require("../../controller/Vendor/vendor'sProfile-ctrl");
const upload = require('../../middleware/upload').upload;
const Vendor = require('../../models/Person/Vendor/vendor')
const Person = require("../../models/Person/person");


async function canView(req, resp, next) {
  console.log(req.user)

  const { role,_id } = req.user;
  const data =  await Person.findOne({_id:_id},{banned:1})
  
  if (!( (role == "vendor" && data.banned == false) || role == "admin")   ) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

async function validateVendor  (req, resp, next) {
  console.log(req.user)
  const { role, _id } = req.user;
  const data =  await Person.findOne({_id:_id},{banned:1})

  if (!((role == "vendor" && _id == req.params.id && data.banned==false) || role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

//router.get('/path',passport.authenticate('jwt', { session: false }),canView,nameOfFunction);
router.post("/add", passport.authenticate('jwt', { session: false }),upload.array("images", 5), canView, vendorItemCtrl.addItem);
router.post("/getItems/:skip", passport.authenticate('jwt', { session: false }), canView, vendorItemCtrl.getItems);
router.get("/getItem/:id", passport.authenticate('jwt', { session: false }), canView, vendorItemCtrl.getOneItem);
router.put("/updateItem/:id/:idperson?", passport.authenticate('jwt', { session: false }),upload.array("images", 5), canView, vendorItemCtrl.updateItem);
router.delete("/deleteItem/:id/:idperson?", passport.authenticate('jwt', { session: false }), canView, vendorItemCtrl.deleteItem);
router.get("/numberOfItem", passport.authenticate('jwt', { session: false }), canView, vendorItemCtrl.numberOfItem);
router.get("/partOfItem/:skip", passport.authenticate('jwt', { session: false }), canView, vendorItemCtrl.partOfItem);

router.put("/updateProfilePassword/:id", passport.authenticate('jwt', { session: false }), validateVendor, vendorprofiileCtrl.updateProfilePassword);
// router.put("/updateProfile/:id",passport.authenticate('jwt', { session: false }),validateVendor,vendorprofiileCtrl.updateProfile);
router.put("/updateProfile/:id", passport.authenticate('jwt', { session: false }), validateVendor, upload.single("image"), vendorprofiileCtrl.updateProfile);
router.get('/showVendorProfile/:id', passport.authenticate('jwt', { session: false }), validateVendor, vendorprofiileCtrl.showVendorProfile);

module.exports = router;
