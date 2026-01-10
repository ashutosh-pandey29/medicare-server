import User from "../../models/User.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";

export const updateAccountService = async (data) => {
  const { username, email, userId } = data;

  if (!username || !email || !userId) {
    throw new Error("information is required");
  }

  // find user using userid

  const user = await db.fetchById(User, userId);

  if (!user) {
    throw new Error(AUTH_MESSAGES.USER_NOT_FOUND);
  }

  // Check if email or username already exists in other accounts

  const isEmailExist = await db.exists(User, { email: email, _id: { $ne: userId } });
  if (isEmailExist) {
    throw new Error("Email already in use by another account.");
  }

  const isUsernameExist = await db.exists(User, { username: username, _id: { $ne: userId } });
  if (isUsernameExist) {
    throw new Error("Username already taken by another user.");
  }

  // update

  const filter = { _id: userId };
  const newAccountValue = { $set: { username: username, email: email } };

  const isUpdated = await db.updateOne(User, filter, newAccountValue, { new: true });

  if (!isUpdated) {
    throw new Error("Account Information Can't be updated");
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "Account Information Updated Successfully",
  };
};
