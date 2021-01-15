const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require("../models/user");

const configOption = require('./configoption')

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(configOption.options, function (jwt_payload, done) {

        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {

                return done(null, user);
            } else {

                return done(null, false);
            }

        });

    }));


    passport.use(new FacebookStrategy(configOption.facebookOptions, function (accessToken, refreshToken, profile, done) {
        User.findOne({ facebookId: profile.id }, async function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (!user) {

                var code = await User.find({}, { _id: 0, ID: true }, { sort: { ID: -1 } }, (error, user) => { })
                if (code.length == 0) {
                    code = 1;
                }
                else {
                    var getcode = code[0].ID + 1;
                    code = getcode;
                }
                User.create({
                    ID: code,
                    UserName: profile.displayName,
                    //Email: profile.emails[0].value,
                    facebookId: profile.id
                },(err, user) =>{
                    return done(null, user);
                })
            }
            else {
                return done(null, user);
            }
        });

    }));

    passport.use(new GoogleStrategy(configOption.googleOptions, function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, async function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (!user) {

                var code = await User.find({}, { _id: 0, ID: true }, { sort: { ID: -1 } }, (error, user) => { })

                if (code.length == 0) {
                    code = 1;
                }
                else {
                    var getcode = code[0].ID + 1;
                    code = getcode;
                }

                User.create({
                    ID: code,
                    UserName: profile.displayName,
                    googleId: profile.id
                },(err, user) =>{
                    console.log(err)
                    return done(null, user);
                })
            }
            else {
                return done(null, user);
            }
        });

    }));

}