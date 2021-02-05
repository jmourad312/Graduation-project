const jwt = require('jsonwebtoken');

// To get privite key 
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

token = function (data){
    const payload = { _id: data._id, role: data.role, iat: Date.now() };
    const token = jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' });
    return token
}

resetToken = function (data){
    const payload = { _id: data._id, iat: Date.now() };
    const token = jwt.sign(payload, PRIV_KEY, { expiresIn: '10m', algorithm: 'RS256' });
    return token
}


module.exports = {token , resetToken}