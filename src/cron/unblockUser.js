import { cronService } from "../services/cron/cron.service";
/**
 * Automatically unblock users blocked for more than 24h
 */

export const unblockUser = async () => {
  const EXPIRE = 24; // 24 HR
  const expiryDate = new Date();
  await cronService.unblockUser(expiryDate);
};
