import { hashPassword } from "../../helpers/password.helper.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { SERVER_MESSAGES } from "../../utils/messages/server.message.js";
import { db } from "../db/db.service.js";

export const resetPasswordService = async (data) => {
  const { token, password } = data;

  if (!token || !password) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Token and password are required");
  }

  // find user with valid reset token

  const user = await db.fetchOne(User, {
    resetPasswordToken: token,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  // hash new password
  const hashedPassword = await hashPassword(password);

  // update password & clear reset token
  const filter = { _id: user._id };
  const updateValue = {
    $set: { password: hashedPassword },
    $unset: { resetPasswordToken: "", resetPasswordTokenExpire: "" },
  };
  const isUpdate = await db.updateOne(User, filter, updateValue);

  if (!isUpdate) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  return {
    message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
  };
};
