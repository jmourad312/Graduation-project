const express = require("express");
const router = express.Router();
const passport = require("passport");
const gettoken = require("../../token/gerenrate-token");
const Person = require("../../models/Person/person");
const Vendor = require("../../models/Person/Vendor/vendor");
const Subscription = require("../../models/Person/Vendor/subscription");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../../Validation/validation");

//signup
router.post("/signup", async (req, res) => {
  // const { error } = registerValidation(req.body);
  // if (error) {
  //   return res.json({ error: error.details[0].message });
  // }
  const saltRounds = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, saltRounds);
  const body = req.body;
  const location = {
    coordinates: [
      req.body.longitude ? req.body.longitude : 0,
      req.body.latitude ? req.body.latitude : 0
    ],
  };

  const person = new Person({ ...body, location:location , password, role: "vendor" });
  const vendor = new Vendor();

  person.save().then((dataOfPerson)=>{
    vendor.person = dataOfPerson._id;
    vendor.save().then((dataOfvendor)=>{
      person.vendorId = dataOfvendor._id;
      person.save()
    })
    const token = gettoken.token(dataOfPerson);
    res.header("Authorization", "Bearer " + token).json({
      Data: dataOfPerson._id,
      Message: "Done Sign up ",
      Success: true,
    });

  }).catch((error)=>{
    res.json({
      Data: error,
      Message: "Can't add vendor",
      Success: false,
    });
  })

});

//signin
router.post("/signin", (req, res) => {
  const { error } = loginValidation(req.body);
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });
  Person.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      res.json({
        Data: null,
        Message: "Can't get userdata from database,  " + err,
        Success: false,
      });
    } else {
      if (data == null) {
        res.json({
          Data: {},
          Message: "Can't find user with this email " + data,
          Success: false,
        });
      } else {
        // Load hash from your password DB.
        bcrypt.compare(
          req.body.password,
          data.password,
          async (err, result) => {
            if (err) {
              res.json({
                Data: null,
                Message: err,
                Success: false,
              });
            } else {
              if (result == false) {
                res.json({
                  Data: {},
                  Message: "Wrong Password",
                  Success: false,
                });
              } else {
                //create and assign a token
                const token = gettoken.token(data);
                res.header("Authorization", "Bearer " + token).json({
                  Data: data._id,
                  Message: "Done Sign in ",
                  Success: true,
                });
              }
            }
          }
        );
      }
    }
  });
});

module.exports = router;
