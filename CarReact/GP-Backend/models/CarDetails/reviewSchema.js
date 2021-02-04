const mongoose = require("mongoose");

var schema = mongoose.Schema;
var itemFeedBack  = new schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: { validator: Number.isInteger },
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
});

module.exports = mongoose.model("ItemFeedBack ", itemFeedBack );
