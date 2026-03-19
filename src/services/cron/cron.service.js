import User from "../../models/User.js";
import { db } from "../../services/db/db.service.js";
export const cronService = {
  // clean unverified user
  cleanUnverifiedUser: async (expDate) => {
    const filter = {
      isEmailVerified: false,
      createdAt: { $lt: expDate },
    };

    await db.deleteMany(User, filter);
  },

  // unblock user
  unblockUser: async (expDate) => {
    const filter = {
      isBlocked: true,
      blockedUntil: { $lte: expDate },
    };

    await db.updateMany(User, filter, {
      isBlocked: false,
      blockedUntil: null,
    });
  },
};
