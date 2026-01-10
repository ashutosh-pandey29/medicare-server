import { hashPassword, verifyPassword } from "../../helpers/password.helper.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";
import { logoutService } from "./logout.service.js";

export const updatePasswordService = async (data) => {
  const { userId, oldPassword, newPassword } = data;

  // console.log(data)
  const user = await db.fetchOne(User, { _id: userId }, "+password");
  // hash old password and verify its match or not

  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.NOT_FOUND);
  }

  const isVerified = await verifyPassword(oldPassword, user.password);

  if (!isVerified) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Password verification failed");
  }

  const isSame = await verifyPassword(newPassword, user.password);
  if (isSame) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "New password must be different from old password");
  }

  const hashedPassword = await hashPassword(newPassword);

  // Update password & logout user
  const isUpdated = await db.updateOne(
    User,
    { _id: userId },
    {
      $set: { password: hashedPassword },
    }
  );

  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Password could not be changed");
  }

  await logoutService(userId);

  return {
    message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
  };
};
