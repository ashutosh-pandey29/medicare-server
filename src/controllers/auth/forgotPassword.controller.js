/**
 * Purpose:
 * Starts the password reset process.
 *
 * When it is used:
 * Called when a user forgets their password and requests a reset.
 *
 * Access:
 * Public route.
 */

import { forgotPasswordService } from "../../services/auth/forgotPassword.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Call forgot password service to generate reset token and send email
    const message = await forgotPasswordService(req.body);

    // Send success response to client
    respond.success(res, { statusCode: HTTP_CODES.OK, message: message });
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
