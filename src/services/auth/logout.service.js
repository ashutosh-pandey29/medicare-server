import User from "../../models/User.js";
import { db } from "../db/db.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";

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

  return {
    httpStatus:HTTP_CODES.OK,
    message:AUTH_MESSAGES.LOGOUT_SUCCESS,
  };

};
