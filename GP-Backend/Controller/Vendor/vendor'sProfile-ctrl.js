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
                            Message: "This email doesn't exist",
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
resetPassword = (req, res) => {
    // compare code and check token then reset password 
    //done   
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

    person.updateOne({ _id: req.params.id }, data, { upsert: true, new: true }, (error, data) => {
        if (error) {
            return res.status(400).json({
                Data: null,
                Message: "You can't update ",
                Success: false,
            });
        }
        else {
            return res.status(200).json({
                Data: data.n,
                Message: "updated ",
                Success: true,
            });
        }
    })
}

module.exports = { updateProfilePassword, updateProfile, forgetPassword }