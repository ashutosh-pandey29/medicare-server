/**
 * ======================================================
 * AUTH CONTROLLER DEPENDENCIES
 * ======================================================
 */

import { forgotPasswordService } from "../../services/auth/forgotPassword.service.js";
import { loginService } from "../../services/auth/login.service.js";
import { logoutService } from "../../services/auth/logout.service.js";
import { registerService } from "../../services/auth/register.service.js";
import { resetPasswordService } from "../../services/auth/resetPassword.service.js";
import { verifyEmailService } from "../../services/auth/verifyEmail.service.js";
import { removeCookie, setCookie } from "../../utils/cookie.js";
import { respond } from "../../utils/respond.js";

/**
 * ======================================================
 * ! REGISTER NEW USER CONTROLLER
 * ======================================================
 */
export const registerController = async (req, res, next) => {
  try {
    // Call service layer to handle registration logic
    const serviceResponse = await registerService(req.body);

    // Send standardized success response
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};

/**
 * ======================================================
 * ! VERIFY REGISTERED USER EMAIL CONTROLLER
 * ======================================================
 */
export const verifyEmailController = async (req, res, next) => {
  try {
    // Extract verification token from URL params
    const { token } = req.params;

    // Call service layer to handle email verification logic
    const response = await verifyEmailService(token);

    // Send standardized success response
    respond.success(res, response);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};

/**
 * ======================================================
 * ! LOGIN EXISTING   USER CONTROLLER
 * ======================================================
 */

export const loginController = async (req, res, next) => {
  try {
    const serviceResponse = await loginService(req.body);

    const { accessToken, refreshToken, message, httpStatus } = serviceResponse;

    // Set refresh token in httpOnly cookie
    setCookie(res, refreshToken);

    // Send success response
    respond.success(res, {
      httpStatus,
      message,
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * ======================================================
 * ! FORGOT PASSWORD CONTROLLER
 * ======================================================
 */

export const forgotPasswordController = async (req, res, next) => {
  try {
    // Call forgot password service to generate reset token and send email
    const serviceResponse = await forgotPasswordService(req.body);

    // Send success response to client
    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error handler
    // console.log(err);
    next(err);
  }
};

/**
 * ======================================================
 * ! RESET  PASSWORD CONTROLLER
 * ======================================================
 */

export const resetPasswordController = async (req, res, next) => {
  try {
    // Call reset password service with token and new password
    const serviceResponse = await resetPasswordService(req.body);
    // Send success response
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};

/**
 * ======================================================
 * ! LOGOUT CONTROLLER
 * ======================================================
 */

export const logoutController = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Protected route, req.user available

    // Remove refresh token from DB
    const serviceResponse = await logoutService(userId);

    // Delete refresh token cookie (if stored in cookie)
    removeCookie(res, "refreshToken");

    // Send response
    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
