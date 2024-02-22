const mongoose = require("mongoose");



const connectDB = async (MONGO_URL) => {
    try {
      await mongoose.connect(MONGO_URL);
      console.log("database connected successfully!");
    } catch (err) {
      console.log(err.message);
    }
  };


module.exports = connectDB;

