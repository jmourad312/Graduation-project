const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const FACEBOOK_APP_ID = '967548663774866';
const FACEBOOK_APP_SECRET = '2ac6fcf1b5a5674807fbf4b1fab8ffaf';

const facebookOptions = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
}

const GOOGLE_APP_ID = '52351952508-hl0kqgkmkdobu6hqjhdlqt4v7eg8s275.apps.googleusercontent.com';
const GOOGLE_APP_SECRET = 'IZlNtFtNW2BZpJ0kJ_PkkbTk';

const googleOptions = {
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_APP_SECRET,
    callbackURL: "http://localhost:3000/user/auth/google/callback",
    profileFields: ['id', 'displayName', 'photos', 'emails']
}

module.exports = {googleOptions,facebookOptions,options}