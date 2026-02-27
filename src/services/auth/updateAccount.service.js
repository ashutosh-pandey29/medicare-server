import User from "../../models/User.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";

export const updateAccountService = async (data) => {
  const { username, email, userId } = data;

  if (!username || !email || !userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.REQUIRED_FIELDS);
  }

  // find user using userid

  const user = await db.fetchById(User, userId);

  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  // Check if email or username already exists in other accounts

  const isEmailExist = await db.exists(User, { email: email, _id: { $ne: userId } });
  if (isEmailExist) {
    throw new ApiError(HTTP_CODES.CONFLICT, AUTH_MESSAGES.EMAIL_ALREADY_IN_USE);
  }

  const isUsernameExist = await db.exists(User, { username: username, _id: { $ne: userId } });
  if (isUsernameExist) {
    throw new ApiError(HTTP_CODES.CONFLICT, AUTH_MESSAGES.USERNAME_ALREADY_TAKEN);
  }

  // update

  const filter = { _id: userId };
  const newAccountValue = { $set: { username: username, email: email } };

  const isUpdated = await db.updateOne(User, filter, newAccountValue, { new: true });

  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.NOT_IMPLEMENTED, AUTH_MESSAGES.UPDATE_FAILED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: AUTH_MESSAGES.UPDATE_SUCCESS,
  };
};
