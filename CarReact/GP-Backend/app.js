const express = require("express");
const passport = require("passport");
const bodyparser = require("body-parser");
const db = require("./config/configDB");
var multer = require("multer");
// to run at angular
const cors = require("cors");
//generate key private and public for secret token
const genKeyPair = require("./generatekeypair");
//Routes
const AuthUserRoute = require("./routes/user/auth");
const AuthVendorRoute = require("./routes/vendor/auth");
const AuthAdminRoute = require("./routes/admin/auth");

const UserRoute = require("./routes/user/user");
const VendorRoute = require("./routes/vendor/vendor");
const AdminRoute = require("./routes/admin/admin");

const blogRoute = require("./routes/blog/blog");
const AdsRoute = require('./routes/Ads/ads')
const passRoute = require('./routes/Ads/ads')

const upload = require("./middleware/upload").upload;

//server
const app = express();
const apiPort = 3000;

app.use(bodyparser.json({ extended: false }));
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Pass the global passport object into the configuration function
require("./config/passport")(passport);
// This will initialize the passport object on every request
app.use(passport.initialize());

//routes
app.use("/user/auth", AuthUserRoute);
app.use("/user", UserRoute);

app.use("/vendor", VendorRoute);
app.use("/vendor/auth", AuthVendorRoute);

app.use("/admin/auth",AuthAdminRoute);
app.use("/admin", AdminRoute);
app.use("/", AdsRoute);


app.use("/blog", blogRoute);
app.use("/auth", passRoute);

//Images
app.use(express.static("uploads"));
app.use("/images", express.static(__dirname + "/uploads"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
