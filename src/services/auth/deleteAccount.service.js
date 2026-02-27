import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { SERVER_MESSAGES } from "../../utils/messages/server.message.js";
import { db } from "../db/db.service.js";

export const deleteAccountService = async (user) => {
  // check user
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  // check role and take action on account
  if (user.role === "user") {
    const isInactive = await db.updateOne(
      User,
      { _id: user.userId },
      { isActive: false, deactivatedAt: new Date() }
    );

    if (isInactive) {
      // logout user
      return {
        httpStatus: HTTP_CODES.OK,
        message: AUTH_MESSAGES.USER_DEACTIVATED,
      };
    }
  } else if (user.role === "doctor") {
    // notify admin and make a delete req after admin approval delete doctor (soft delete)

    return {
      httpStatus: HTTP_CODES.OK,
      message: AUTH_MESSAGES.DOCTOR_DELETE_REQUEST,
    };
  }

  throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
};
