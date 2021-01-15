const jwt = require('jsonwebtoken');

module.exports = async function (req, resp, next) {
    const token = req.header('auth-token');

    if (!token)
        return (
            resp.json({
                "Data": {},
                "Message": "Access Denied",
                "Success": false
            }))
    try {
        const verified = jwt.verify(token, config.secret);
        req.user = verified;
        next();

    } catch (err) {
        resp.json({
            "Data": {},
            "Message": "Invalid Token: " + err,
            "Success": false
        })
    }
}


