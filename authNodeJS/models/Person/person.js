const mongoose = require("mongoose");

var schema = mongoose.Schema;
var person = new schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  password: String,
<<<<<<< HEAD
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88rI7RXVX2mJ4tuynlW20f-wsl9lzNKhCHg&usqp=CAU",
  },
  createdAt: Date,
  updatedAt: Date,
=======
  image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88rI7RXVX2mJ4tuynlW20f-wsl9lzNKhCHg&usqp=CAU" },
>>>>>>> 9e3dcad46a5f603a6b47e7ec5b3277dc5a94e17c
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
