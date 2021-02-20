const express = require("express");
const { route } = require("../user/user");
const router = express.Router();
const Admin = require("../../Controller/Admin/admin-ctrl");
const ContactCtrl = require("../../Controller/Admin/ContactUs-ctrl");
const passport = require("passport");

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

router.get("/test/:id/:i?", (req, res) => {
  console.log(req.params.i);
});

router.post(
  "/addBrand",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.addBrand
);
router.post(
  "/addModel/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.addModel
);
router.post(
  "/addCollection",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.addCollection
);

//**********************************************************************************//

router.get("/getBrand", Admin.getBrand);
router.get("/getModel/:name", Admin.getModel);
router.get("/getCollection", Admin.getCollection);

//////////////////////////////////////////////////////////////////////////////////////////

//delete
router.delete(
  "/deleteBrand/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.deleteBrand
);
router.delete(
  "/deleteCollection/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.deleteCollection
);
router.delete(
  "/deleteModel/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.deleteModel
);

//update
router.put(
  "/updateBrand/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.updateBrand
);
router.put(
  "/updateCollection/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.updateCollection
);
router.put(
  "/updateModel/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.updateModel
);

/////////////////////////////////////////////////////////////////////////////////////

//Ban
router.post(
  "/addUserBan",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.addUserBan
);
router.post(
  "/removeUserBan",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.removeUserBan
);
router.post(
  "/addVendorBan",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.addVendorBan
);
router.post(
  "/removeVendorBan",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.removeVendorBan
);

//delete
router.delete(
  "/deleteUser/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.deleteUser
);
router.delete(
  "/deleteVendor/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.deleteVendor
);

//Calculate
router.get(
  "/countAll",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.countAll
);
router.get(
  "/usersNumber",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.usersNumber
);
router.get(
  "/vendorsNumber",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.vendorsNumber
);
router.get(
  "/vendorItems",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.numberOfItem
);

// show all
router.post(
  "/showAllUsers/:skip",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.showAllUsers
);

router.get(
  "/showAllUsersPosts/:skip",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.showAllUsersPosts
);

router.post(
  "/showAllVendors/:skip",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.showAllVendors
);

router.get(
  "/showAllVendorsProducts/:skip",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.showAllVendorsProducts
);

router.get(
  "/getItemsVendor/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.getItemsVendor
);
router.get(
  "/getBlogsUser/:id",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  Admin.getBlogsUser
);

// ContactUs
router.post("/sendContact", ContactCtrl.sendContactUs);
router.get(
  "/getContactUs/:skip",
  passport.authenticate("jwt", { session: false }),
  validateAdmin,
  ContactCtrl.getContactUs
);

module.exports = router;
