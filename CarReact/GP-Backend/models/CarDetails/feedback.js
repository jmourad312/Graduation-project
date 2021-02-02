
const mongoose = require("mongoose");

var schema = mongoose.Schema;
var itemFeedBack = new schema({
    content:String,
    star:Number, 
});


module.exports = mongoose.model("ItemFeedBack",itemFeedBack);;
