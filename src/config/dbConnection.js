import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log("Database connected successfully:", conn.connection.host);
  } catch (err) {
    console.error("DB connecting failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
