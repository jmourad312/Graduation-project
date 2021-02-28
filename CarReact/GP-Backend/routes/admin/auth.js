const express = require("express");
const router = express.Router();
const passport = require('passport');
const gettoken = require('../../token/gerenrate-token')
const Person = require('../../models/Person/person');
const Admin = require('../../models/Person/admin')
const bcrypt = require('bcryptjs');

function validateAdmin(req, resp, next) {
    console.log(req.user);
    const { role, _id } = req.user;
    if (!(role == "admin")) {
        resp.header("Authorization", null).json({
        Data: null,
        Message: "can't access",
        Success: false,
      });
    } else next();
  }


//signup
router.post('/signup',   passport.authenticate("jwt", { session: false }),
validateAdmin,async (req, resp) => {

    const saltRounds = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltRounds);

    Person.create({

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        email: req.body.email,
        role: "admin",
        password: password,

    }, (errorPerson, dataOfPerson) => {
        if (errorPerson) {
            return resp.json({
                "Data": {},
                "Message": "Can't add user to database,  " + err,
                "Success": false
            })
        }

        const admin = new Admin({ person: dataOfPerson._id })
        admin.save()
        const token = gettoken.token(dataOfPerson);
        resp.header("Authorization", "Bearer " + token).json({
            "Data": dataOfPerson._id,
            "Message": "Done Sign up ",
            "Success": true
        })

    });
});

//signin
router.post('/signin', (req, resp) => {
    Person.findOne({ email: req.body.email }, (err, data) => {

        if (err) {
            return resp.json({
                "Data": null,
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }

        if (data == null) {
            return resp.json({
                "Data": {},
                "Message": "Can't find user with this email " + data,
                "Success": false
            })
        }


        // Load hash from your password DB.
        bcrypt.compare(req.body.password, data.password, async (err, result) => {
            if (err) {
                return resp.json({
                    "Data": null,
                    "Message": err,
                    "Success": false
                })
            }
            if (result == false) {
                return resp.json({
                    "Data": {},
                    "Message": "Wrong Password",
                    "Success": false
                })
            }
            //create and assign a token
            const token = gettoken.token(data);

           return resp.header("Authorization", "Bearer " + token).json({
                "Data": data._id,
                "Message": "Done Sign in ",
                "Success": true
            })
        });  
    });
});


module.exports = router