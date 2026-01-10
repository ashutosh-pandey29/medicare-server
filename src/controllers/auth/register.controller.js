/**
 * Purpose:
 * Handles new user registration.
 *
 * When it is used:
 * Called when a user creates a new account using email and password.
 *
 * Access:
 * Public route.
 */
import { registerService } from "../../services/auth/register.service.js";
import { respond } from "../../utils/respond.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";

export const registerController = async (req, res, next) => {
  try {
    const response  =  await registerService(req.body);

    respond.success(res, response  );
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
