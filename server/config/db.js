// db.js
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1); // Exit the process with failure
  }
};

mongoose.Promise = global.Promise;

module.exports = connectDB;
