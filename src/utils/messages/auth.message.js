/**
 * Centralized authentication messages
 */

export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  ACCOUNT_BLOCKED: "Account temporarily blocked",
  ACCESS_DENIED: "Access denied",
  ALREADY_EXISTS: "Email or username already registered",
  INVALID_REGISTRATION: "Invalid registration data",
  REGISTRATION_SUCCESS:"Your account has been created successfully. A verification email has been sent.",
  REGISTRATION_FAILED: "Failed to create account. Please check your information and try again.",
  ACCOUNT_BLOCKED:"Your account is temporarily blocked due to multiple failed login attempts. Please try again after 24 hours.",
  ACCOUNT_DELETED: "Your unverified registration data has been removed after 24 hours.",
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Login failed",
  TOO_MANY_ATTEMPTS: "Too many failed login attempts, try later",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in",
  LOGOUT_SUCCESS: "Logout successful",
  TOKEN_MISSING: "Authentication token missing",
  TOKEN_INVALID: "Authentication token invalid or expired",
  REFRESH_TOKEN_SUCCESS: "Access token refreshed successfully",
  VERIFICATION_EMAIL_SENT: "Verification email sent",
  EMAIL_VERIFIED: "Email verified successfully",
  EMAIL_ALREADY_VERIFIED: "Email already verified",
  VERIFICATION_TOKEN_INVALID: "Invalid or expired verification token",
  PASSWORD_RESET_EMAIL_SENT: "Password reset email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
  RESET_TOKEN_INVALID: "Invalid or expired reset token",
  ACCOUNT_REACTIVATION_FAILED:"Your account can't be reactivated please try again letter.",


  /* ===== PROFILE ===== */
  PROFILE_FETCHED: "User profile fetched successfully",
};
