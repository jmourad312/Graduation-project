const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const gettoken = require('./token/gerenrate-token.js')


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