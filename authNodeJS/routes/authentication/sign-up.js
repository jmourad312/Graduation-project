const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const gettoken = require('./token/gerenrate-token')

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

module.exports = router