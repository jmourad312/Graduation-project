const express = require("express");
const router = express.Router();
const passport = require("passport");
const vendorCtrl = require("../../Controller/Vendor/vendor-ctrl");

function canView(req, resp, next) {
  const { Role, ID } = req.user;
  if (!((Role == "user" || Role == "admin") && ID == req.params.code)) {
    resp.json({
      Data: null,
      Message: "can't access",
      Success: false,
    });
  } else next();
}

//router.get('/path',passport.authenticate('jwt', { session: false }),canView,nameOfFunction);

router.post("/add", vendorCtrl.addItem);
router.get("/getItems", vendorCtrl.getItems);
router.get("/getItem/:id", vendorCtrl.getOneItem);
router.put("/updateItem/:id", vendorCtrl.updateItem);
router.delete("/deleteItem/:id", vendorCtrl.deleteItem);


module.exports = router;
