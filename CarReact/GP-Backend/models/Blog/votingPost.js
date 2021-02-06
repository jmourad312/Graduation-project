var mongoose = require("mongoose");

var schema = mongoose.Schema;
var voting = new schema({

    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person",
    },


});

module.exports = mongoose.model("Voting", voting);
