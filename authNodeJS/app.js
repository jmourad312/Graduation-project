const express = require("express"); 
const passport = require('passport');

const fs = require("fs");
const bodyparser = require("body-parser");
const routeuser = require("./routes/user");
const routeauth = require("./routes/auth");
const cors = require("cors");

const genKeyPair = require('./generatekeypair')


//server
const app = express();
app.use(cors());

// load driver for mongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/carDB",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});



//
var files_arr = fs.readdirSync(__dirname+"/models");
files_arr.forEach(function(file){
    require(__dirname+"/models/"+file);
});

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());


app.use(bodyparser.json({extended:false}));


app.use('/auth',routeauth);
app.use('/user',routeuser);


app.use((req,resp,next)=>{
    resp.send("Hello page not found");
});

app.listen(3000);