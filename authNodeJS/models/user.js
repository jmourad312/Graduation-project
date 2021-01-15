var mongoose = require("mongoose");

var schema = mongoose.Schema;
var user = new schema({
  ID: {
    type: Number,
    unique: true,
    required: true,
  },
  facebookId:{
    type: Number,
  },
  googleId: {
    type: Number,
  },
  UserName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  PhoneNumber:{
    type:Number,
  },
  CreateDate: {
    type: Date,
    default: Date.now
  },
  uptateDate:{
    type: Date,
    default: Date.now
  },
  Image:{
    type:String
  },
  DateOfBirth:{
    type:Date,
  },
  Role: {
    type: String,
    default: "user",
  },
  Subsribtion:{
    type:Boolean,
    default:false
  },
  Banned:{
    type:Boolean
  },
  Dates:{
    OpeningTime:String,
    ClosingTime:String,
    ClosingDay:String,
  },



});


module.exports = mongoose.model("User", user);