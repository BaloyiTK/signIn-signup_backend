import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection error!, " + error.message);
    process.exit(1);
  }
};

export default connectDB;
