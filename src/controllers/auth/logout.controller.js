/**
 * Purpose:
 * Logs out the currently authenticated user.
 *
 * When it is used:
 * Called when a user clicks logout.
 *
 * Access:
 * Protected route (user must be logged in).
 */

import { logoutService } from "../../services/auth/logout.service.js";
import { respond } from "../../utils/respond.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { removeCookie } from "../../utils/cookie.js";

export const logoutController = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Protected route, req.user available

    // Remove refresh token from DB
    await logoutService(userId);

    // Delete refresh token cookie (if stored in cookie)
    removeCookie(res , "refreshToken");

    // Send response
    respond.success(res, {
      statusCode: HTTP_CODES.OK,
      message: "Logout successful",
    });
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
