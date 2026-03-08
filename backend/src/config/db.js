import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  const { MONGO_URI } = ENV;

  if(!MONGO_URI) {
    console.log("Missing env key - MONGO_URI");
  }

  try {
    await mongoose.connect(MONGO_URI);

    console.log("DB connected successfully");

  } catch (error) {
    console.log("Error connecting to DB");
    process.exit(1);
  }
}