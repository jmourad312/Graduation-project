const mongoose = require("mongoose");

var schema = mongoose.Schema;
var ads = new schema({
    name: String,
    createdAT:Date,
    expired:Date,
    description:String,
    image:Date,
    content:Array,
});


module.exports = mongoose.model("Ad",ads);
