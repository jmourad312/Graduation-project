const JwtStrategy = require('passport-jwt').Strategy
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Person = require('../models/Person/person')
const User = require('../models/Person/User/user');
const configOption = require('./configoption')

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(configOption.options, function (jwt_payload, done) {
        // We will assign the `sub` property on the JWT to the database ID of user
        Person.findOne({ _id: jwt_payload._id }, function (err, user) {
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, jwt_payload);
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

                Person.create({
                    firstName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                    role: "user",
                }, (err, user) => {
                    User.create({
                        person: user._id,
                        facebookId: profile.id
                    }, (err2, user2) => {
                        return done(null, user);
                    })
                })
            }
            else {
                return done(null, user);
            }
        });

    }));

    passport.use(new GoogleStrategy(configOption.googleOptions, function (accessToken, refreshToken, profile, done) {
        console.log("google:::",profile)
        Person.findOne({ googleId: profile.id }, async function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (!user) {

                Person.create({
                    firstName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                    role: "user",
                }, (err, user) => {
                    User.create({
                        person: user._id,
                        googleId: profile.id
                    }, (err2, user2) => {
                        return done(null, user);
                    })
                })
            }
            else {
                return done(null, user);
            }
        });

    }));

}