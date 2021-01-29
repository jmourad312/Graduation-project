const express = require("express");
const passport = require("passport");
const bodyparser = require("body-parser");
const db = require('./config/configDB')
// to run at angular
const cors = require("cors");
//generate key private and public for secret token
const genKeyPair = require("./generatekeypair");
//Routes 
const AuthUserRoute = require('./routes/user/auth');
const AuthVendorRoute = require('./routes/vendor/auth');
const AuthAdminRoute = require('./routes/admin/auth');

const UserRoute = require('./routes/user/user');
const VendorRoute = require('./routes/vendor/vendor');
const AdminRoute = require('./routes/admin/admin');



//server
const app = express();
const apiPort = 3000;

app.use(bodyparser.json({ extended: false }));
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Pass the global passport object into the configuration function
require("./config/passport")(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

//routes
app.use("/user/auth",AuthUserRoute);
app.use("/user",UserRoute);

//app.use("/vendor/auth",AuthVendorRoute);
//app.use("/vendor",VendorRoute);

//app.use("/admin/auth",AuthAdminRoute);
//app.use("/admin",AdminRoute);



app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))