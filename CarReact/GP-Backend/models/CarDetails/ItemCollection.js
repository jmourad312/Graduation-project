const mongoose = require("mongoose");

var schema = mongoose.Schema;
var itemCollection= new schema({
    name: String, 
});

module.exports = mongoose.model("ItemCollection",itemCollection);;
