const person = require('../../models/Person/person')
const vendor = require('../../models/Person/Vendor/vendor')
const subscription = require('../../models/Person/Vendor/subscription')
const bcrypt = require('bcryptjs');
const gettoken = require('../../token/gerenrate-token')
const transporter = require('../../config/configEmail')
const Feedback = require('../../models/Feedback/feedback')


//update password
updateProfilePassword = async (req, res) => {

    const saltRounds = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltRounds);



    person.updateOne({ _id: req.params.id }, { password: password }, { upsert: true, new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                Data: null,
                Message: "You can't update your password",
                Success: false,
            });
        }
        else {
            return res.status(200).json({
                Data: data.n,
                Message: "your password updated ",
                Success: true,
            });
        }
    })
}

//update profile
updateProfile = async (req, res) => {

    const body = JSON.parse(JSON.stringify(req.body));

    const saltRounds = await bcrypt.genSalt(10);
    const update = {}

    if (req.body.password) {
        update.password = await bcrypt.hash(req.body.password, saltRounds);
    }

    if (req.file) {
        update.image = "http://localhost:3000/images/" + req.file.filename;
    }

    person.updateOne({ _id: req.params.id }, { ...body, ...update }, { upsert: true, new: true }, (errorPerson, dataOfPerson) => {
        if (errorPerson) {
            return res.status(400).json({
                Data: null,
                Message: "You can't update ",
                Success: false,
            });
        }
        else {

            vendor.updateOne({ person: req.params.id }, { ...body }, { upsert: true, new: true }, (error, dataOfVendor) => {
                if (error) {
                    return res.status(400).json({
                        Data: null,
                        Message: "You can't update ",
                        Success: false,
                    });
                }
                else {
                    return res.status(200).json({
                        Data: dataOfVendor.n + dataOfPerson.n,
                        Message: "updated ",
                        Success: true,
                    });
                }
            })
        }
    })
}

showVendorProfile = (req, res) => {
    const IdPerson = req.params.id;
    const populateQuery = [{ path: "person", select: "-subscribe -role -password -createdAt -updatedAt -__v -_id -codeToResetPassword" }, { path: "VendorSubscription", select: "-__v -_id -person" }];
    vendor.findOne({ person: IdPerson }, {__v: 0, _id: 0 }).populate(populateQuery).exec( async (err, data) => {
        if (err || data.length == 0) {
            return res.json({
                Data: err,
                Message: "this Vendor doesn't exsist",
                Success: false,
            });
        }
        
        const feedback = await Feedback.find({_id:{$in:data.vendorFeedBack}},{__v:0,car:0}).populate({path:"user",select:"firstName workshopName"})

        return res.json({
            Data: data,feedback,
            Message: "Done Fet vendor profile",
            Success: true,
        });
    });
};



module.exports = {
    updateProfilePassword, updateProfile,
     showVendorProfile
}