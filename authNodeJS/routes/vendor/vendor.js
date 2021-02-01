const express = require("express");
const router = express.Router();
const passport = require("passport");
const vendorCtrl = require("../../Controller/Vendor/vendor-ctrl");

function canView(req, resp, next) {
  const { Role} = req.user;
  if (!(Role == "vendor" || Role == "admin")) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

//router.get('/path',passport.authenticate('jwt', { session: false }),canView,nameOfFunction);
router.post("/add", passport.authenticate('jwt', { session: false }),canView,vendorCtrl.addItem);
router.get("/getItems",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.getItems);
router.get("/getItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.getOneItem);
router.put("/updateItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.updateItem);
router.delete("/deleteItem/:id",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.deleteItem);
router.get("/numberOfItem",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.numberOfItem);
router.get("/partOfItem/:skip",passport.authenticate('jwt', { session: false }),canView,vendorCtrl.partOfItem);


module.exports = router;
