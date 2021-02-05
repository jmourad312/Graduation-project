const express = require("express");
const router = express.Router();
const blogCtrl = require('../../Controller/Blog/blog-ctrl');
const { route } = require("../user/auth");

router.post("/showFilterPosts", blogCtrl.showFilterPosts)

router.get("/showDetailsPost/:id", blogCtrl.showDetailsPost)


router.get("/showAllPosts", blogCtrl.showAllPosts)

module.exports = router