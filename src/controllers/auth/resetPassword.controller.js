/**
 * Purpose:
 * Resets the user password using a reset token.
 *
 * When it is used:
 * Called after the user submits a new password.
 *
 * Access:
 * Public route (token based).
 */

import { resetPasswordService } from "../../services/auth/resetPassword.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const resetPasswordController = async (req, res, next) => {
  try {
    // Call reset password service with token and new password

    const message = await resetPasswordService(req.body);

    // Send success response

    respond.success(res, { statusCode: HTTP_CODES.OK, message: message });
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
