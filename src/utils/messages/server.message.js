/**
 * Centralized server-side error messages
 */

export const SERVER_MESSAGES = {
  /* ===== COMMON ===== */
  INTERNAL_SERVER_ERROR: "An internal server error occurred. Please try again later.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again later.",
  DATABASE_CONNECTION_FAILED: "Unable to establish a connection to the database.",
  INVALID_REQUEST: "The request is invalid or malformed.",
  OPERATION_FAILED: "The operation could not be completed at this time.",

  /* ===== AUTH / PERMISSIONS ===== */
  UNAUTHORIZED: "Authentication is required to access this resource.",
  FORBIDDEN: "You do not have permission to perform this action.",
  ACCESS_DENIED: "Access to this resource is denied.",

  TOO_MANY_REQ:"Too many requests. Please try again after some time.",

  /* ===== DEVELOPMENT / DEBUGGING ===== */
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again later.",
};
