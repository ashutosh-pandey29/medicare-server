import User from "../../models/User.js";
import { db } from "../../services/db/db.service.js";
export const cronService = {
  cleanUnverifiedUser: async (expDate) => {
    const filter = {
      isEmailVerified: false,
      createdAt: { $lt: expDate },
    };

    await db.deleteMany(User, filter);
  },
};
