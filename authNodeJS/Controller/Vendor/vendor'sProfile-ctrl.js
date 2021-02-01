const person = require('../../models/Person/person')
const vendor = require('../../models/Person/Vendor/vendor')
const subscription = require('../../models/Person/Vendor/subscription')
const feedBack = require('../../models/Person/Vendor/feedBack')
const bcrypt = require('bcryptjs');


//forget password
forgetPassword = (req,res) => {

}
//reset password
resetPassword = (req,res) => {
    
}

//update password
updateProfilePassword = async (req, res) => {

    const saltRounds = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltRounds);

    person.updateOne({_id:req.params.id},{password:password}, { upsert: true, new: true },(error,data)=>{
        if(error){
            return res.status(400).json({
                Data: null,
                Message: "You can't update your password",
                Success: false,
              });
        }
        else{
            return res.status(200).json({
                Data: data.n,
                Message: "your password updated ",
                Success: true,
              });
        }
    })
}

//updates 
updateProfile = async (req, res) => {

    const {...data} = req.body

    person.updateOne({_id:req.params.id},data, { upsert: true, new: true },(error,data)=>{
        if(error){
            return res.status(400).json({
                Data: null,
                Message: "You can't update ",
                Success: false,
              });
        }
        else{
            return res.status(200).json({
                Data: data.n,
                Message: "updated ",
                Success: true,
              });
        }
    })
}

module.exports = {updateProfilePassword, updateProfile}