const person = require('../../models/Person/person')
const vendor = require('../../models/Person/Vendor/vendor')
const subscription = require('../../models/Person/Vendor/subscription')
const feedBack = require('../../models/Person/Vendor/feedBack')
const bcrypt = require('bcryptjs');
const gettoken = require('../../token/gerenrate-token')
const transporter = require('../../config/configEmail')

//forget password
forgetPassword = (req, res) => {

    person.findOne({ email: req.body.email }, (error, data) => {

        if (error || !data) {
            return res.status(400).json({
                Data: null,
                Message: "This email doesn't exist",
                Success: false,
            });
        }

        const token = gettoken.resetToken(data._id);
        const code = Math.floor(1000 + Math.random() * 9000);
        const mailOptions = {
            from: 'dreksyonyteam@gmail.com',
            to: data.email,
            subject: 'Reset Password',
            text: `code to reset password: ${code}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    Data: null,
                    Message: "can't sent mail",
                    Success: false,
                });
            }
            else {
                console.log('Email sent: ' + info.response);
                person.updateOne({ email: req.body.email }, { codeToResetPassword: code }, (error, dataUpdateCode) => {
                    if (error) {
                        return res.status(400).json({
                            Data: null,
                            Message: "try again",
                            Success: false,
                        });
                    }
                    else {
                        return res.status(200).json({
                            Data: `Bearer ${token}`,
                            Message: "write the code",
                            Success: true,
                        });
                    }
                })
            }
        });
    })
}
//reset password
resetPassword = async (req, res) => {
    const data = await person.findOne({ email: req.body.email })
    if (data.codeToResetPassword == req.body.code) {
        const saltRounds = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, saltRounds);
        person.updateOne({ email: req.body.email }, { password }, (error, data) => {
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
    else {
        return res.status(400).json({
            Data: null,
            Message: "You can't update your password",
            Success: false,
        });
    }
}

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

    const { ...data } = req.body

    person.updateOne({ _id: req.params.id }, data, { upsert: true, new: true }, (errorPerson, dataOfPerson) => {
        if (errorPerson) {
            return res.status(400).json({
                Data: null,
                Message: "You can't update ",
                Success: false,
            });
        }
        else {

            vendor.updateOne({ person: req.params.id }, data, { upsert: true, new: true }, (error, dataOfVendor) => {
                if (error) {
                    return res.status(400).json({
                        Data: null,
                        Message: "You can't update ",
                        Success: false,
                    });
                }
                else {
                    return res.status(200).json({
                        Data: dataOfVendor.n + dataOfPerson+n,
                        Message: "updated ",
                        Success: true,
                    });
                }
            })
        }
    })
}

showVendorProfile = (req, res) => {
    const IdPerson = req.params.id
    const populateQuery = [{ path: "person", select: "-subscribe -role -password -createdAt -updatedAt -__v -_id -codeToResetPassword" }, { path: "VendorSubscription", select: "-__v -_id -person" }];
    vendor.findOne({ person: IdPerson }, { vendorFeedBack: 0, __v: 0, _id: 0 }).populate(populateQuery).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                Data: err,
                Message: "*****************",
                Success: false,
            });
        }
        else {
            return res.status(200).json({
                Data: data,
                Message: ":D :D",
                Success: true,
            });
        }
    });
};

module.exports = { updateProfilePassword, updateProfile, forgetPassword, resetPassword, showVendorProfile }