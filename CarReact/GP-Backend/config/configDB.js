const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://noraalaa:1571997@cluster0.kemlt.mongodb.net/carDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;
module.exports = db;
