import { env } from "../../config/env.js";
import { createOneTimeToken } from "../../helpers/token.helper.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { SERVER_MESSAGES } from "../../utils/messages/server.message.js";
import { db } from "../db/db.service.js";
import { mailTo } from "../email/mailTo.service.js";
import { resetPasswordTemplate } from "../email/templates/resetPassword.template.js";

export const forgotPasswordService = async (data) => {
  // Normalize and validate email input
  const email = data?.email?.toLowerCase().trim();
  if (!email) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Email is missing.");
  }

  // Check if user exists with the provided email
  const user = await db.fetchOne(User, { email: email });
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, AUTH_MESSAGES.USER_NOT_FOUND);
  }

  // Generate one-time reset token and set expiry (15 minutes)
  const resetPasswordToken = createOneTimeToken();
  const resetPasswordTokenExpire = new Date(Date.now() + 15 * 60 * 1000); //15 min

  // Save reset token and expiry in database

  const updateValue = { $set: { resetPasswordToken, resetPasswordTokenExpire } };
  const result = await db.updateOne(User, { email: email }, updateValue);
  // Ensure token was successfully saved

  if (!result || result.matchedCount === 0) {
    throw new ApiError(HTTP_CODES.SERVICE_UNAVAILABLE, SERVER_MESSAGES.SERVICE_UNAVAILABLE);
  }

  // Build password reset link
  const resetLink = `${env.FRONTEND_URL}/auth/reset-password?token=${resetPasswordToken}`;

  // Generate reset password email template
  const emailTemplate = resetPasswordTemplate(user.username, resetLink);

  // Send reset password email
  const isSend = await mailTo({
    to: user.email,
    subject: "Reset Your Password - Medicare Hospital",
    text: emailTemplate,
  });

  // Handle email sending failure
  if (!isSend) {
    throw new ApiError(
      HTTP_CODES.SERVICE_UNAVAILABLE,
      "Failed to send reset password email. Please try again later."
    );
  }

  // Success response
  return {
    message: AUTH_MESSAGES.PASSWORD_RESET_EMAIL_SENT,
  };
};
