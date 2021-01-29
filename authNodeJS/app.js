const express = require("express");
const passport = require("passport");
const bodyparser = require("body-parser");
const db = require('./config/configDB')
const AuthUserRoute = require('./routes/user/auth');
// to run at angular
const cors = require("cors");
//generate key private and public for secret token
const genKeyPair = require("./generatekeypair");


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
app.use("/auth",AuthUserRoute);


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))