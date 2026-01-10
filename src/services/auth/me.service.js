import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";

export const meService = async (data) => {
  const { userId } = data;

  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.TOKEN_INVALID);
  }

  const user = await db.fetchOne(User, { _id: userId }, "username email");

  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.NOT_FOUND);
  }

  return {
    message: AUTH_MESSAGES.PROFILE_FETCHED,
    data: {
      username: user.username,
      email: user.email,
    },
  };
};
