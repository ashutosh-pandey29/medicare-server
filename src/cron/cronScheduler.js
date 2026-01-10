import cron from "node-cron";
import { cleanUnverifiedUser } from "./cleanupUser.js";

export const cronScheduler = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      console.log("cron job running.....", new Date().toISOString());
      await cleanUnverifiedUser();
    } catch (err) {
      console.error("Cron failed:", err);
    }
  });
};
