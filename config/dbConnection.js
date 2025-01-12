const clc = require("cli-color");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(clc.greenBright.bold.italic("✓ database connected success"));
  } catch (error) {
    console.log(clc.bgCyanBright.bold.italic("✘ Error conncting DB", error));
  }
};
module.exports = connectDB;
