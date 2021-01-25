const jwt = require('jsonwebtoken');

// To get privite key 
const fs = require('fs');
const path = require('path');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = function (data){
    const payload = { _id: data._id, Role: data.Role, iat: Date.now() };
    const token = jwt.sign(payload, PRIV_KEY, { expiresIn: 33*1000, algorithm: 'RS256' });
    return token
}

