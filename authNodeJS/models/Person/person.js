const mongoose = require("mongoose");

var schema = mongoose.Schema;
var person = new schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  password: String,
  image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88rI7RXVX2mJ4tuynlW20f-wsl9lzNKhCHg&usqp=CAU" },
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
}
  , { timestamps: true },
);

module.exports = mongoose.model("Person", person);
