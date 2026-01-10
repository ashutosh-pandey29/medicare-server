/**
 * Cleanup unverified users:
 * Soft delete after 24h ->prod
 * Hard delete after 72h -> prod
 */

import { cronService } from "../services/cron/cron.service.js";

export const cleanUnverifiedUser = async () => {
  const EXPIRE = 24; // 24 HR
  const expiryDate = new Date(Date.now() - EXPIRE * 60 * 60 * 1000);

  // const EXPIRE_MINUTES = 1;

  // const expiryDate = new Date(
  //   Date.now() - EXPIRE_MINUTES * 60 * 1000
  // );


  await cronService.cleanUnverifiedUser(expiryDate);
};
