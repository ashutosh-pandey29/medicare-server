import mongoose from "mongoose";
import { env } from "./env.js";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log("database connected successfully");
  } catch (err) {
    console.log("db connecting failed");
    process.exit(1);
  }
};

export default connectDB;
