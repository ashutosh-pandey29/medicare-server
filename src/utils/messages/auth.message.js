/**
 * Centralized authentication messages
 */

export const AUTH_MESSAGES = {
  INVALID_REGISTRATION: "Invalid registration data",
  REGISTRATION_SUCCESS:
    "Your account has been created successfully. A verification email has been sent.",
  REGISTRATION_FAILED: "Failed to create account. Please check your information and try again.",
  ALREADY_EXISTS: "Email or username already registered",
  LOGIN_SUCCESS: "Login successful",
  LOGIN_FAILED: "Login failed",
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_NOT_FOUND: "User not found",
  ACCESS_DENIED: "Access denied",
  ACCOUNT_BLOCKED:
    "Your account is temporarily blocked due to multiple failed login attempts. Please try again after 24 hours.",
  ACCOUNT_DELETED: "Your unverified registration data has been removed after 24 hours.",
  ACCOUNT_PERMANENT_DELETED: "Your account has been deleted.",
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
  PASSWORD_NOT_UPDATED: "Password not updated",
  PASSWORD_UPDATED: "Password updated",
  PASSWORD_VERIFICATION_FAILED: "Password verification failed",
  DIFF_PASSWORD: "New password must be different from old password",
  RESET_TOKEN_INVALID: "Invalid or expired reset token",
  ACCOUNT_REACTIVATION_FAILED: "Your account cannot be reactivated. Please try again later.",
  USER_DEACTIVATED:
    "Your account has been deactivated. It will be permanently deleted after 72 hours. You can reactivate it by contacting support.",
  DOCTOR_DELETE_REQUEST: "Your account deletion request has been sent to admin for approval.",

  /* ===== PROFILE ===== */
  PROFILE_FETCHED: "User profile fetched successfully",

  REQUIRED_FIELDS: "Username, email, and user ID are required",
  EMAIL_ALREADY_IN_USE: "Email is already in use by another account",
  USERNAME_ALREADY_TAKEN: "Username is already taken by another user",
  UPDATE_FAILED: "Failed to update account information",
  UPDATE_SUCCESS: "Account information updated successfully",


  EMAIL_ALREADY_REGISTERED_WITH_OTHER_PROVIDER:
    "This email is already registered using another login method",
  USERNAME_GENERATION_FAILED: "Unable to generate a unique username",
  USER_CREATION_FAILED: "Failed to create user account",
  GOOGLE_LOGIN_SUCCESS: "Logged in successfully with Google",
};
