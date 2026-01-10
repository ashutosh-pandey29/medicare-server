export const MAIL_MESSAGES = {
  /* ===== VERIFICATION EMAILS ===== */
  VERIFICATION_EMAIL_SENT: "Verification email has been sent. Please check your inbox.",
  EMAIL_VERIFIED: "Your email has been verified successfully.",
  EMAIL_ALREADY_VERIFIED: "Your email is already verified.",
  VERIFICATION_TOKEN_INVALID:
    "The verification link is invalid or expired. Please request a new one.",
  VERIFICATION_EXPIRED:
    "You did not verify your email within 24 hours. Your registration information has been safely deleted.",

  /* ===== PASSWORD RESET EMAILS ===== */
  PASSWORD_RESET_EMAIL_SENT: "Password reset instructions have been sent to your email.",
  PASSWORD_RESET_SUCCESS: "Your password has been reset successfully.",
  RESET_TOKEN_INVALID: "The password reset link is invalid or expired. Please request again.",

  /* ===== ACCOUNT / NOTIFICATIONS ===== */


  /* ===== GENERIC EMAIL ERRORS ===== */
  MAIL_SENDING_FAILED: "Failed to send email. Please try again later.",
  MAIL_TRANSPORTER_FAILED: "Failed to initialize mail service. Please try again later.", // transporter init fail
  MAIL_TRANSPORTER_ERROR: "Mail service is currently unavailable. Please try again later.", // general transporter error

  /* ===== NEWSLETTERS / UPDATES (Optional Future Use) ===== */
  NEWSLETTER_SENT: "Newsletter has been sent successfully.",
  UPDATE_NOTIFICATION_SENT: "Notification email has been sent successfully.",
};
