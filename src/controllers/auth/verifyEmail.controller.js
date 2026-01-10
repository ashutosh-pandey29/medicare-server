/**
 * Purpose:
 * Verifies user email using a verification token.
 *
 * When it is used:
 * Called when the user clicks the email verification link.
 *
 * Access:
 * Public route.
 */

import { verifyEmailService } from "../../services/auth/verifyEmail.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const verifyEmailController = async (req, res, next) => {
  try {

    const { token } = req.params;
    const message = await verifyEmailService(token);

    respond.success(res, { statusCode: HTTP_CODES.OK, message });
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
