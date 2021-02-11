const express = require("express");
const { route } = require("../user/user");
const router = express.Router();
const Admin = require('../../Controller/Admin/admin-ctrl')
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

router.get('/test/:id/:i?',(req,res)=>{
    console.log(req.params.i)
})

router.post('/addBrand', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.addBrand);
router.post('/addModel/:id', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.addModel);
router.post('/addCollection/:id', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.addCollection);

//**********************************************************************************//
router.get('/getBrand',Admin.getBrand);
router.get('/getModel/:name', Admin.getModel);

//Ban
router.post('/addUserBan', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.addUserBan);
router.post('/removeUserBan', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.removeUserBan);
router.post('/addVendorBan', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.addVendorBan);
router.post('/removeVendorBan', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.removeVendorBan);

//delete
router.delete('/deleteUser/:id',passport.authenticate("jwt", { session: false }), validateAdmin, Admin.deleteUser)
router.delete('/deleteVendor/:id',passport.authenticate("jwt", { session: false }), validateAdmin, Admin.deleteVendor)


//Calculate 
router.get('/countAll', passport.authenticate("jwt", { session: false }), validateAdmin,Admin.countAll)
router.get('/usersNumber', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.usersNumber);
router.get('/vendorsNumber', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.vendorsNumber);
router.get('/vendorItems', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.numberOfItem);

// show all 
router.get('/showAllUsers', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.showAllUsers);
router.get('/showAllVendors', passport.authenticate("jwt", { session: false }), validateAdmin, Admin.showAllVendors);
router.get("/getItemsVendor/:id", passport.authenticate('jwt', { session: false }), validateAdmin, Admin.getItemsVendor);
router.get("/getBlogsUser/:id", passport.authenticate('jwt', { session: false }), validateAdmin, Admin.getBlogsUser);



module.exports = router;
