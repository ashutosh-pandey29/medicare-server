// Import required modules and helpers
import User from "../../models/User.js";
import { db } from "../db/db.service.js";
import { generateJwtToken } from "../../helpers/jwt.helper.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { verifyPassword } from "../../helpers/password.helper.js";
import { env } from "../../config/env.js";

export const loginService = async (data) => {
  // Configuration constants
  const REFRESH_TOKEN_EXPIRY_DAYS = 30;
  const MAX_LOGIN_ATTEMPTS = 3;

  // Extract login credentials
  const { login_id, password } = data;

  // Find user by username OR email, include password field
  const filter = { $or: [{ username: login_id }, { email: login_id }] };
  const user = await db.fetchOne(User, filter, "+password");

  // If user not found, throw invalid credentials
  if (!user) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  //============== ACCOUNT INACTIVE CHECK=====================

  if (!user.isActive) {
    const now = new Date();
    const d = (now - user.deactivatedAt) / (1000 * 60 * 60 * 24);

    if (d <= 7) {
      // Reactivate account if within 7 days
      const isReactivated = await db.updateOne(
        User,
        { _id: user._id },
        {
          $set: {
            isActive: true,
            deactivatedAt: null,
          },
        }
      );

      if (!isReactivated) {
        throw new ApiError(
          HTTP_CODES.INTERNAL_SERVER_ERROR,
          AUTH_MESSAGES.ACCOUNT_REACTIVATION_FAILED
        );
      }
    } else {
      // Permanently deleted after 7 days
      throw new ApiError(HTTP_CODES.FORBIDDEN, "Your account is deleted");
    }
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.EMAIL_NOT_VERIFIED);
  }

  // Check if user account is blocked
  if (user.isBlocked && user.blockedUntil > new Date()) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, AUTH_MESSAGES.ACCOUNT_BLOCKED);
  }

  // Ensure password exists
  if (!user.password) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Password not found for user");
  }

  // ================= PASSWORD VERIFICATION =================

  // verify password
  const isPasswordVerify = await verifyPassword(password, user.password);

  if (!isPasswordVerify) {
    // Increment login attempts
    const updatedAttempts = user.loginAttempts + 1;

    if (updatedAttempts >= MAX_LOGIN_ATTEMPTS) {
      // Block account for 24 hours if max attempts reached
      const blockedUntilDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // update blocking value
      const filter = { _id: user._id };
      const value = {
        $set: { loginAttempts: 0, isBlocked: true, blockedUntil: blockedUntilDate },
      };
      await db.updateOne(User, filter, value);
    } else {
      // Update login attempt count
      await db.updateOne(User, { _id: user._id }, { $set: { loginAttempts: updatedAttempts } });
    }

    // Throw error with remaining attempts
    let attemptsLeft = MAX_LOGIN_ATTEMPTS - updatedAttempts;
    throw new ApiError(
      HTTP_CODES.TOO_MANY_REQUESTS,
      `${AUTH_MESSAGES.INVALID_CREDENTIALS}.Attempts let : ${attemptsLeft}`
    );
  }

  // ================= JWT TOKEN GENERATION =================


  // Prepare payload for JWT token
  const payload = {
    userId: user._id,
    role: user.role,
    username: user.username,
  };

  // generate access  token
  const accessToken = generateJwtToken(payload, env.JWT_ACCESS_TOKEN, env.JWT_ACCESS_TOKEN_EXPIRES);

  // generate refresh token
  const refreshToken = generateJwtToken(
    payload,
    env.JWT_REFRESH_TOKEN,
    env.JWT_REFRESH_TOKEN_EXPIRES
  );


  // Ensure tokens were generated
  if (!accessToken || !refreshToken) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, AUTH_MESSAGES.INTERNAL_SERVER_ERROR);
  }


  // Store refresh token in database
  await db.updateOne(
    User,
    { _id: user._id },
    {
      $set: {
        refreshToken: refreshToken,
        refreshTokenExpireAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
        ),
      },
    }
  );

  
  // Reset login attempts after successful login
  await db.updateOne(
    User,
    { _id: user._id },
    {
      $set: {
        loginAttempts: 0,
        isBlocked: false,
        blockedUntil: null,
      },
    }
  );

  // success - Return tokens to controller
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};
