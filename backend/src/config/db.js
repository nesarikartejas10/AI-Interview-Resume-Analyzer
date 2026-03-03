import mongoose from "mongoose";
import { config } from "./envConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("Connect to DB successfully");
  } catch (error) {
    console.log("Failed to connect DB:", error.message);
    process.exit(1);
  }
}

export default connectDB;
