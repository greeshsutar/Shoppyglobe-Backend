import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Loads environment variables

export async function connectDB() {
  try {
    // Uses your exact variable name from the .env file
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("DB connected Success ✅");
  } catch (err) {
    console.log("DB Error:", err);
    process.exit(1); // Safely stops the server if the database fails to connect
  }
}

// Gives it a fallback default export just in case
export default connectDB;