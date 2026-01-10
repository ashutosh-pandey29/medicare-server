import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";
export const verifyEmailService = async (token) => {
  // check token availability
  if (!token) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  // Find user associated with the token
  const user = await db.fetchOne(
    User,
    { emailVerificationToken: token },
    "+emailVerificationToken +emailVerificationTokenExpire"
  );

  // If no token found, token is invalid or expired
  if (!user) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  // check if user already verified
  if (user.isEmailVerified) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED);
  }

  if (user.emailVerificationTokenExpire && user.emailVerificationTokenExpire < new Date()) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  // Update user verification status and clear token
  const filter = { _id: user._id };
  const updateValue = {
    $set: { isEmailVerified: true },
    $unset: { emailVerificationToken: "", emailVerificationTokenExpire: "" },
  };
  const isUpdated = await db.updateOne(User, filter, updateValue, { new: true });

  // verification failed
  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, AUTH_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  // success response
  return {
    message: AUTH_MESSAGES.EMAIL_VERIFIED,
  };
};
