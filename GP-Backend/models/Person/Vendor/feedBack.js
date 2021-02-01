
const mongoose = require("mongoose");

var schema = mongoose.Schema;
var vendorFeedBack = new schema({
    content:String,
    star:Number, 
});


module.exports = mongoose.model("VendorFeedBack",vendorFeedBack);;
