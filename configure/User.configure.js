const mongoose = require("mongoose");
const dotenv = require("dotenv"); //  add this

dotenv.config(); // load env variables

async function mongoDbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI); //  use env here
    console.log("DB connected Success");
  } catch (err) {
    console.log("DB Error:", err);
  }
}

module.exports = mongoDbConnect;