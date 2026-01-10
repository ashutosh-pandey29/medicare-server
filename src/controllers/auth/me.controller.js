/**
 * Purpose:
 * Returns the currently logged-in user's profile.
 *
 * When it is used:
 * Called to check authentication status or load user data.
 *
 * Access:
 * Protected route.
 */

import { meService } from "../../services/auth/me.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const meController = async (req, res, next) => {
  try {
    const data = {
      userId: req.user?.userId,
    };

    const result = await meService(data);

    respond.success(res, { statusCode: HTTP_CODES.OK, message: result.message, data: result.data });
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
