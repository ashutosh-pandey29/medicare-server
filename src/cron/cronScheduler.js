// Import node-cron package to schedule background jobs
import cron from "node-cron";

// Import the function that will clean/delete unverified users
import { cleanUnverifiedUser } from "./cleanupUser.js";

export const cronScheduler = () => {
  // Schedule a cron job
  // "0 * * * *" → Runs at minute 0 of every hour (i.e., every 1 hour)
  cron.schedule("0 * * * *", async () => {
    try {
      // console.log("cron job running.....", new Date().toISOString());

      // Call the function to remove unverified users from database
      await cleanUnverifiedUser();
    } catch (err) {
      console.error("Cron failed:", err);
    }
  });
};
