const express = require("express");
const passport = require("passport");

const fs = require("fs");
const bodyparser = require("body-parser");

const AuthUserRoute = require('./routes/user/auth');


// to run at angular
const cors = require("cors");

//generate key private and public for secret token
const genKeyPair = require("./generatekeypair");

//server
const app = express();
app.use(cors());

// load driver for mongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/carDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});


// //models 
// require('./models/Person/admin');
// require('./models/Person/person')

// //schema in files 
// files = ["/models/Blog", "/models/CarDetails", "/models/Independace", "/models/Person/Vendor", "/models/Person/User"]

// for (let i = 0; i < files.length; i++) {
//   var files_arr = fs.readdirSync(__dirname + files[i]);
//   files_arr.forEach(function (file) {
//     require(__dirname + files[i] + "/" + file);
//   });
// }


// Pass the global passport object into the configuration function
require("./config/passport")(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

//bodyparser
app.use(bodyparser.json({ extended: false }));


//routes
app.use("/auth",AuthUserRoute);

app.use((req, resp, next) => {
  resp.send("Hello page not found");
});

app.listen(3000);
