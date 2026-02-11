import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment
    const conn = await mongoose.connect(env.MONGO_URI);

    // console.log("Database connected successfully:", conn.connection.host);
  } catch (err) {
    // console.error("DB connecting failed:", err.message);

    // Stop application if database is not connected
    process.exit(1);
  }
};

export default connectDB;
