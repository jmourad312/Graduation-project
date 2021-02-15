const express = require("express");
const router = express.Router();
const passport = require("passport");
const gettoken = require("../../token/gerenrate-token");
const Person = require("../../models/Person/person");
const User = require("../../models/Person/User/user");
const Subscription = require("../../models/Person/User/subscription");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../../Validation/validation");

//FaceBook
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    //create and assign a token
    const token = gettoken.token(req.user);
    res.header("Authorization", "Bearer " + token).json({
      Data: req.user._id,
      Message: "Done Sign in ",
      Success: true,
    });
  }
);

//Google
router.get("/google", passport.authenticate("google", { scope: ["email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //create and assign a token
    const token = gettoken.token(req.user);
    res.header("Authorization", "Bearer " + token).json({
      Data: req.user._id,
      Message: "Done Sign in ",
      Success: true,
    });
  }
);

//signup
router.post("/signup", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const saltRounds = await bcrypt.genSalt(10);
  bcrypt.hash(req.body.password, saltRounds, function (errorHash, hash) {
    if (errorHash) {
      res.json({
        Data: {},
        Message: "Can't add user to database,  " + errorHash,
        Success: false,
      });
    }
    // Store hash in your password DB.
    else {
      Person.create(
        {
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          email: req.body.email,
          image: req.body.image,
          phoneNumber: req.body.phoneNumber,
          subscribe: req.body.subscribe,
          role: "user",
          password: hash,
        },
        (errorPerson, dataOfPerson) => {
          if (errorPerson) {
            res.json({
              Data: {},
              Message: "Can't add user to database,  " + errorPerson,
              Success: false,
            });
          } else {
            Subscription.create(
              {
                type: req.body.type,
                createdAt: req.body.createdAt,
                endAt: req.body.endAt,
              },
              (errorSubscription, dataOfSubscription) => {
                if (errorSubscription) {
                  res.json({
                    Data: {},
                    Message:
                      "Can't add user to database,  " + errorSubscription,
                    Success: false,
                  });
                } else {
                  User.create(
                    {
                      person: dataOfPerson._id,
                      userSubscription: dataOfSubscription._id,
                    },
                    (errorUser, dataOfUser) => {
                      if (errorUser) {
                        res.json({
                          Data: {},
                          Message: "Can't add user to database,  " + errorUser,
                          Success: false,
                        });
                      } else {
                        const token = gettoken.token(dataOfPerson);
                        res.header("Authorization", "Bearer " + token).json({
                          Data: dataOfPerson._id,
                          Message: "Done Sign in ",
                          Success: true,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
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
