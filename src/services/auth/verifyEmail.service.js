import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";
import { doctorRegistrationTemplate } from "../email/templates/doctorRegistration.template.js";
import { mailTo } from "../email/mailTo.service.js";
import { env } from "../../config/env.js";
import { generateStrongPassword } from "../../helpers/password.helper.js";


export const verifyEmailService = async (token) => {
  if (!token) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  const user = await db.fetchOne(
    User,
    { emailVerificationToken: token },
    "+emailVerificationToken +emailVerificationTokenExpire +role +email +username"
  );

  if (!user) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  if (user.isEmailVerified) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED);
  }

  if (user.emailVerificationTokenExpire && user.emailVerificationTokenExpire < new Date()) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.VERIFICATION_TOKEN_INVALID);
  }

  let tempPassword;
  let hashedPassword;

  if (user.role === "doctor") {
    tempPassword = generateStrongPassword(10);
    hashedPassword = await bcrypt.hash(tempPassword, 10);
  }

  //  update
  const updateValue = {
    $set: { isEmailVerified: true, ...(user.role === "doctor" && { password: hashedPassword }) },
    $unset: { emailVerificationToken: "", emailVerificationTokenExpire: "" },
  };

  const isUpdated = await db.updateOne(User, { _id: user._id }, updateValue, { new: true });

  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, AUTH_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  // Send email
  if (user.role === "doctor") {
    const loginUrl = `${env.FRONTEND_URL}/auth/login`;
    const doctorRegistrationHtml = doctorRegistrationTemplate({
      name: user.username,
      email: user.email,
      password: tempPassword,
      loginUrl,
    });

    await mailTo({
      to: user.email,
      subject: "Login credential - Medicare Hospital",
      text: doctorRegistrationHtml,
    });
  }

  return { statusCode: HTTP_CODES.OK, message: AUTH_MESSAGES.EMAIL_VERIFIED };
};
