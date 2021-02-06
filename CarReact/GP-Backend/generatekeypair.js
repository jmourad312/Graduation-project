// Including generateKeyPair from crypto module 
const { generateKeyPair } = require('crypto');
const fs = require('fs');

// Calling generateKeyPair() method 
// with its parameters 
function genKeyPair() {

    generateKeyPair('rsa', {
        modulusLength: 4096, // bits - standard for RSA keys
        //namedCurve: 'secp256k1',   // Options 
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    },
        (err, publicKey, privateKey) => { // Callback function 
            if (!err) {
                // Create the public key file
                fs.writeFileSync(__dirname + '/id_rsa_pub.pem', publicKey);
                // Create the private key file
                fs.writeFileSync(__dirname + '/id_rsa_priv.pem', privateKey);
            }
            else {
                // Prints error 
                console.log("Errr is: ", err);
            }
        });

}
module.exports = genKeyPair;
