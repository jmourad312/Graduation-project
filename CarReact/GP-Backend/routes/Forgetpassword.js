const password = require('../Controller/forgetPassword')

router.post("/forgetPassword", password.forgetPassword);
router.post("/resetPassword", passport.authenticate('jwt', { session: false }), password.resetPassword)