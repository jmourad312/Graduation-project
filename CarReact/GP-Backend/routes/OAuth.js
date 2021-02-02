const express = require("express");
const router = express.Router();
const passport = require('passport');
const gettoken = require('../token/gerenrate-token')

//FaceBook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, resp) => {
    //create and assign a token
    const token = gettoken(req.user);
    resp.json({
        "Data": { "token": "Bearer " + token, "expiresIn": 33 * 1000 },
        "Message": "Done Sign up by Facebook ",
        "Success": true
    })
});

//Google
router.get('/google', passport.authenticate('google', { scope: ['email'] }))
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, resp) => {
    //create and assign a token
    const token = gettoken(req.user);
    resp.json({
        "Data": { "token": "Bearer " + token, "expiresIn": 33 * 1000 },
        "Message": "Done Sign up by Google ",
        "Success": true
    })
});




module.exports = router


