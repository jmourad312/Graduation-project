const express = require("express");
const router = express.Router();
const passport = require('passport');
const gettoken = require('../../token/gerenrate-token')
const Person = require('../../models/Person/person');
const User = require('../../models/Person/User/user');
const Subscription = require('../../models/Person/User/subscription')
const bcrypt = require('bcryptjs');


//FaceBook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, resp) => {

    //create and assign a token
    const token = gettoken(req.user);
    resp.json({
        "Data": { "token": "Bearer " + token, "expiresIn": 33 * 1000 },
        "Message": "Done Sign in ",
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
        "Message": "Done Sign in ",
        "Success": true
    })
});

//signup
router.post('/signup', async (req, resp) => {

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't add user to database,  " + err,
                "Success": false
            })
        }
        // Store hash in your password DB.
        else {
            Person.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                email: req.body.email,
                image: req.body.image,
                phoneNumber: req.body.phoneNumber,
                subscribe: req.body.subscribe,
                role: "user",
                password: hash,

            }, (err, data) => {
                if (err) {
                    console.log(err)
                    resp.json({
                        "Data": {},
                        "Message": "Can't add user to database,  " + err,
                        "Success": false
                    })
                }
                else {

                    User.create({ person: data._id }, (err2, data2) => {
                        if (err2) {
                            console.log(err)
                            resp.json({
                                "Data": {},
                                "Message": "Can't add user to database,  " + err,
                                "Success": false
                            })
                        }
                        else {
                            const token = gettoken(data);
                            resp.json({
                                "Data": { "token": "Bearer " + token, "expiresIn": '1d' },
                                "Message": "Done Sign in ",
                                "Success": true
                            })
                        }
                    })
                }
            });
        }
    });
});

//signin
router.post('/signin', (req, resp) => {
    Person.findOne({ Email: req.body.Email }, (err, data) => {

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
                bcrypt.compare(req.body.password, data.password, async (err, result) => {
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