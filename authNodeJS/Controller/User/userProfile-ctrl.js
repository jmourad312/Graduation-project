 const person = require('../../models/Person/person');
 const user= require ('../../models/Person/User/user');
 const userSubscription= require ('../../models/Person/User/subscription');
 const bcrypt = require('bcryptjs');

 //User info (show info - update info)
// 1- show info
showUserProfile = (req, res) => {

    User.findOne({ ID: req.params.code }, { _id: 0, __v: 0 }, (err, data) => {
        if (err) {
            res.status(400).json({
                "Data": null,
                "Message": "Can't get userdata from database,  " + err,
                "Success": false
            })
        }
        else {
            if (data == null) {
                res.status(400).json({
                    "Data": null,
                    "Message": "Data with that id: " + req.params.code + " don't exist",
                    "Success": false
                })
            }
            else {
                res.status(200).json({
                    "Data": data,
                    "Message": "Done get all data",
                    "Success": true
                })
            }
        }
    })
};

module.exports = {showUserProfile}
