const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');


function canView (req,resp,next){
    const { Role,ID } = req.user;
    if(! ((Role == 'user' || Role == 'admin') &&  ID == req.params.code)) {
        resp.json({
            "Data": null,
            "Message": "can't access",
            "Success": false
        })
    }
    else 
        next();
}

router.get('/:code',passport.authenticate('jwt', { session: false }),canView,(req, resp) => {

    User.findOne({ ID: req.params.code }, { _id: 0, __v: 0 }, (err, data) => {
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
                    "Data": null,
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all data",
                    "Success": true
                })
            }
        }
    })
});


router.get('/' ,(req, resp) => {

    User.find({}, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                resp.json({
                    "Data": data,
                    "Message": "Done get all data",
                    "Success": true
                })
            }
        }
    })
});



router.delete('/:code',(req, resp) => {
    User.deleteOne({ ID: req.params.code }, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't delete userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }

            else {
                resp.json({
                    "Data": data,
                    "Message": "Done delete  ",
                    "Success": true
                })
            }
        }
    })
});

router.put('/:code' ,(req, resp) => {
    User.updateOne({ ID: req.params.code }, req.body, (err, data) => {
        if (err) {
            resp.json({
                "Data": {},
                "Message": "Can't update userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                resp.json({
                    "Data": {},
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }

            else {
                resp.json({
                    "Data": {},
                    "Message": "Number of data update: " + data.nModified,
                    "Success": true
                })
            }
        }
    })
});





module.exports = router