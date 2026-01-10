/**
 * Cookie Utility Functions
 * ------------------------
 * This file contains reusable functions to handle HTTP cookies in the application.
 *
 * Functions:
 * 1. setCookie(res, name, value, options)  - Set a cookie on the response with default security options.
 * 2. getCookie(req, name)                  - Retrieve a cookie value from the incoming request.
 * 3. clearCookie(res, name)                - Clear/delete a cookie from the client.
 *
 * Usage:
 *  Used in authentication (login, logout, refresh token) and other modules needing cookie management.
 *  Default options include: httpOnly, secure (production only), sameSite=Strict, maxAge=1 day (configurable).
 */

import { ApiError } from "./apiError.js";
import { HTTP_CODES } from "./httpCodes.js";
import { SERVER_MESSAGES } from "./messages/server.message.js";

export const setCookie = (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return true;
  } catch (err) {
    // Log for debugging
    console.error("Failed to set cookie:", err);
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const removeCookie = (res, key) => {
  try {
    res.clearCookie(key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  } catch (err) {
    throw new ApiError(err);
  }
};
