/**
 * Purpose:
 * Handles user login using email and password.
 
 * When it is used:
 * Called when a user tries to log in with custom credentials.
 
 * Access:
 * Public route (no authentication required).
 */

// Import required modules and helpers
import { loginService } from "../../services/auth/login.service.js";
import { setCookie } from "../../utils/cookie.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { respond } from "../../utils/respond.js";
 
export const loginController = async (req, res, next) => {
  try {

    // Call the login service to validate user and get tokens
    const { accessToken, refreshToken } = await loginService(req.body);

    // Set refresh token in httpOnly cookie (secure storage)
    // Access token will be sent in response body for client-side use
    setCookie(res, refreshToken);

    // Send success response with access token
    respond.success(res, {
      statusCode: HTTP_CODES.OK,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      data: { accessToken},
    });


  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
