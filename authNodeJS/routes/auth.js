const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');



// To get privite key 
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

function gettoken(data){
    const payload = { _id: data._id, Role: data.Role, ID: data.ID, iat: Date.now() };
    const token = jwt.sign(payload, PRIV_KEY, { expiresIn: 33*1000, algorithm: 'RS256' });
    return token
}


//FaceBook
router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, resp) => {

    //create and assign a token
    const token = gettoken(req.user); 
    resp.json({
        "Data": { "token": "Bearer " + token, "expiresIn": 33*1000 },
        "Message": "Done Sign in ",
        "Success": true
    })
});


//Google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}))
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, resp) => {
    //create and assign a token
    const token = gettoken(req.user); 
    resp.json({
        "Data": { "token": "Bearer " + token, "expiresIn": 33*1000 },
        "Message": "Done Sign in ",
        "Success": true
    })
});


//signup
router.post('/signup', async (req, resp) => {
    var code = await User.find({}, { _id: 0, ID: true }, { sort: { ID: -1 } }, (error, data) => { })
    if (code.length == 0) {
        code = 1;
    }
    else {
        var getcode = code[0].ID + 1;
        code = getcode;
    }

    const saltRounds = 10;
    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't add user to database,  " + err,
                "Success": false
            })
        }
        // Store hash in your password DB.
        else {
            User.create({
                ID: code,
                UserName: req.body.UserName,
                Email: req.body.Email,
                Password: hash,
            }
                , (err, data) => {
                    if (err) {
                        console.log(err)
                        resp.json({
                            "Data": {},
                            "Message": "Can't add user to database,  " + err,
                            "Success": false
                        })
                    }
                    else {
                        //create and assign a token
                        const token = gettoken(data); 
                        resp.json({
                            "Data": { "token": "Bearer " + token, "expiresIn": '1d' },
                            "Message": "Done Sign in ",
                            "Success": true
                        })
                    }
                });
        }
    });
});


router.post('/signin', (req, resp) => {
    User.findOne({ Email: req.body.Email }, (err, data) => {

        if (err) {
            resp.json({
                "Data": null,
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Can't find user with this email " + data,
                    "Success": false
                })
            }
            else {
                // Load hash from your password DB.
                bcrypt.compare(req.body.Password, data.Password, async (err, result) => {
                    if (err) {
                        resp.json({
                            "Data": null,
                            "Message": err,
                            "Success": false
                        })
                    }
                    else {
                        if (result == false) {
                            resp.json({
                                "Data": {},
                                "Message": "Wrong Password",
                                "Success": false
                            })
                        }
                        else {
                            //create and assign a token
                            const token = gettoken(data); 
                            resp.json({
                                "Data": { token: "Bearer " + token, expiresIn: '1d' },
                                "Message": "Done Sign in ",
                                "Success": true
                            })

                        }
                    }
                });
            }
        }
    });
});





module.exports = router