const express = require("express");
const router = express.Router();
const passport = require('passport');
const gettoken = require('./token/gerenrate-token')
const User = require('../../models/user');
const bcrypt = require('bcryptjs');


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

//signin
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