export const NOTIFICATION_MESSAGE = {
  //  ACCOUNT
  NEW_ACCOUNT: "A new user has created an account",
  DELETE_ACCOUNT: "A user account has been deleted",
  DELETE_ACCOUNT_REQUEST: "A user requested account deletion",

  /**==============DOCTOR PROFILE - ADMIN NOTIFICATION MESSAGE */

  PROFILE_VERIFICATION_REQUEST: "Profile verification request",
  PROFILE_DELETE_REQUEST:
    "You have received a new request to permanently delete a doctor profile. ",

  /* ========== DOCTOR DASHBOARD NOTIFICATIONS ========== */
  PROFILE_VERIFIED: "Your doctor profile has been successfully verified",
  PROFILE_REJECTED: "Your doctor profile verification request has been rejected",
  ACCOUNT_DELETE_APPROVED: "Your account deletion request has been approved",
  ACCOUNT_DELETE_REJECTED: "Your account deletion request has been rejected",
  PROFILE_UPDATE_APPROVED: "Your profile update request has been approved",
  PROFILE_UPDATE_REJECTED: "Your profile update request has been rejected",

  UNAUTHORIZED: "Unauthorized request. User authentication is required.",

  SUBSCRIPTION: {
    ENDPOINT_REQUIRED: "Subscription endpoint is required to disable notifications.",
    NOT_FOUND: "No active subscription found for the provided endpoint.",
    DISABLED_SUCCESS: "Push notification subscription disabled successfully.",
    SAVE_FAILED: "Failed to save notification subscription. Please try again.",
    ENABLED_SUCCESS: "Push notification subscription enabled successfully.",
    DATA_REQUIRED: "Subscription data is required to enable notifications.",
    ENDPOINT_KEYS_REQUIRED: "Subscription endpoint and encryption keys are required.",
  },
};
