import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const deleteAccountService = async (user) => {
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "User not found");
  }

  // check role and take action on account

  if (user.role === "user") {
    // make user inactive for 7  and after 72 hr delete user (soft delete)

    const isInactive = await db.updateOne(
      User,
      { _id: user.userId },
      { isActive: false, deactivatedAt: new Date() }
    );

    if (isInactive) {
      // logout user

      return {
        httpStatus: HTTP_CODES.OK,
        message:
          "Your account has been deactivated. It will be permanently deleted after 72 hours. You can reactivate it by contacting support.",
      };
    }
  } else if (user.role === "doctor") {
    // notify admin and make a delete req after admin approval delete doctor (soft delete)

    return {
      httpStatus: HTTP_CODES.OK,
      message: "Your account deletion request has been sent to admin for approval.",
    };
  }

  throw new ApiError(HTTP_CODES.BAD_REQUEST, "Invalid user role");
};
