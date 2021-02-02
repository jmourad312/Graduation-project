const express = require("express");
const router = express.Router();
const passport = require('passport');
const userProfileCtrl = require('../../controller/User/userProfile-ctrl')

function canView(req, resp, next) {
    const { role} = req.user;
    if (!(role == "user" || role == "admin")) {
      resp.json({
        Data: null,
        Message: "can't access",
        Success: false,
      });
    } else next();
  }
  
  function validateUser(req, resp, next) {
    const { role, _id} = req.user;
    if (! ( (role == "user" || role == "admin") && _id == req.params.id) ) {
      resp.json({
        Data: null,
        Message: "can't access",
        Success: false,
      });
    } else next();
  }

router.get('/showUserProfile/:id',passport.authenticate('jwt', { session: false }),validateUser,userProfileCtrl.showUserProfile);

router.put('/updateUserProfile/:id' , passport.authenticate('jwt', { session: false }),validateUser,userProfileCtrl.updateUserProfile);





module.exports = router