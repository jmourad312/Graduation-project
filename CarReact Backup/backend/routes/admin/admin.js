const express = require("express");
const { route } = require("../user/user");
const router = express.Router();
const Car = require('../../Controller/Admin/admin-ctrl')

router.post('/addBrand',Car.addBrand)
router.post('/addModel/:id',Car.addModel)


module.exports = router;
