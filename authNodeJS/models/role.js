const mongoose = require("mongoose");

var schema = mongoose.Schema;
var role = new schema({
    name: String
});


module.exports = mongoose.model("Role",role);;
