import User from "../../models/User.js";
import { db } from "../db/db.service.js";

export const logoutService = async (userId) => {
  await db.updateOne(
    User,
    { _id: userId },
    {
      $set: {
        refreshToken: null,
        refreshTokenExpireAt: null,
      },
    }
  );

  return ;

};
