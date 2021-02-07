const express = require("express");
const { route } = require("../user/user");
const router = express.Router();
const Admin = require('../../Controller/Admin/admin-ctrl')

router.post('/addBrand',Admin.addBrand);
router.post('/addModel/:id',Admin.addModel);
router.post('/addCollection/:id',Admin.addCollection);

router.get('/getBrand',Admin.getBrand);
router.get('/getModel/:name',Admin.getModel);

//Ban
router.post('/addUserBan/:id',Admin.addUserBan);
router.post('/addUserBan/:id',Admin.removeUserBan);
router.post('/addVendorBan/:id',Admin.addVendorBan);
router.post('/addVendorBan/:id',Admin.removeVendorBan);

//Calculate 

router.get('/usersNumber',Admin.usersNumber);
router.get('/VendorsNumber',Admin.vendorsNumber);
router.get('/vendorItems',Admin.numberOfItem);

// show all 
router.get('/showAllUsers',Admin.showAllUsers);
router.get('/showAllVendors',Admin.showAllVendors);


module.exports = router;
