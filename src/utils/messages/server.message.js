/**
 * Centralized server-side error messages
 */

export const SERVER_MESSAGES = {
  /* ===== COMMON ===== */
  INTERNAL_SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
  DATABASE_CONNECTION_FAILED: "Database connection failed",
  INVALID_REQUEST: "Invalid request data",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  OPERATION_FAILED: "Operation could not be completed",

  /* ===== AUTH / PERMISSIONS ===== */
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden, you do not have permission",


  /* ===== DEVELOPMENT / DEBUGGING ===== */
  UNKNOWN_ERROR: "An unknown error occurred",
};
