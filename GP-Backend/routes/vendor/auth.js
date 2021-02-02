const express = require("express");
const router = express.Router();
const passport = require('passport');
const gettoken = require('../../token/gerenrate-token')
const Person = require('../../models/Person/person');
const Vendor = require('../../models/Person/Vendor/vendor');
const Subscription = require('../../models/Person/Vendor/subscription')
const bcrypt = require('bcryptjs');


//signup
router.post('/signup', async (req, resp) => {

    const saltRounds = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltRounds);

    Person.create({

        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        image: req.body.image,
        phoneNumber: req.body.phoneNumber,
        subscribe: req.body.subscribe,
        role: "vendor",
        password: password,

    }, (errorPerson, dataOfPerson) => {
        if (errorPerson) {
            resp.json({
                "Data": {},
                "Message": "Can't add user to database,  " + err,
                "Success": false
            })
        }

        else {
            Subscription.create({
                type: req.body.type,
                createdAt: req.body.createdAt,
                endAt: req.body.endAt

            }, (errorSubscription, dataOfSubscription) => {

                if (errorSubscription) {
                    resp.json({
                        "Data": {},
                        "Message": "Can't add user to database,  " + errorSubscription,
                        "Success": false
                    })
                }
                else {

                    Vendor.create({
                        person: dataOfPerson._id,
                        workshopSchedule: { openingTime: "f", closingTime: "k", closingDays: req.body.closingDays },
                        vendorSubscription: dataOfSubscription._id,

                    }, (errorVendor) => {
                        if (errorVendor) {
                            console.log(err)
                            resp.json({
                                "Data": {},
                                "Message": "Can't add user to database,  " + errorVendor,
                                "Success": false
                            })
                        }
                        else {
                            const token = gettoken.token(dataOfPerson);
                            resp.header("Authorization", "Bearer " + token).json({
                                "Data": dataOfPerson._id,
                                "Message": "Done Sign up ",
                                "Success": true
                            })
                        }
                    })
                }
            })
        }
    });
});

//signin
router.post('/signin', (req, resp) => {
    Person.findOne({ email: req.body.email }, (err, data) => {

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
                            const token = gettoken.token(data);
                            resp.header("Authorization", "Bearer " + token).json({
                                "Data": dataOfPerson._id,
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