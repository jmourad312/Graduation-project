const mongoose = require("mongoose");

var schema = mongoose.Schema;
var person = new schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  password: String,
  image: String,
  createdAt: Date,
  updatedAt: Date,
  phoneNumber: [Number],
  subscribe: Boolean,
  role: { type: String, enum: ["user", "admin", "vendor"], default: "user" },
  region: {
    country: String,
    region: String,
    location: [
      {
        city: String,
        address: String,
      },
    ],
  },
});

module.exports = mongoose.model("Person", person);
