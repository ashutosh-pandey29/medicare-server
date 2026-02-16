import { env } from "../config/env.js";
import { ApiError } from "./apiError.js";
import { HTTP_CODES } from "./httpCodes.js";
import { SERVER_MESSAGES } from "./messages/server.message.js";

//! SET REFRESH TOKEN COOKIE
export const setCookie = (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return true;
  } catch (err) {
    // Log for debugging
    // console.error("Failed to set cookie:", err);
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

//! REMOVE COOKIE
export const removeCookie = (res, key) => {
  try {
    res.clearCookie(key, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
  } catch (err) {
    throw new ApiError(err);
  }
};
