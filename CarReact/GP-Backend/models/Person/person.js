const mongoose = require("mongoose");
const { numberOfItem } = require("../../controller/Vendor/vendor'sItem-ctrl");

var schema = mongoose.Schema;
var person = new schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88rI7RXVX2mJ4tuynlW20f-wsl9lzNKhCHg&usqp=CAU",
    },
    phoneNumber: Number,
    subscribe: Boolean,
    role: { type: String, enum: ["user", "admin", "vendor"], default: "user" },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: [ longitude, latitude],
    },
    codeToResetPassword: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", person);
