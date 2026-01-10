/**
 * Centralized HTTP status codes
 */

export const HTTP_CODES = {
  /* ===== SUCCESS ===== */
  OK: 200, // Request successful
  CREATED: 201, // Resource created successfully
  NO_CONTENT: 204, // Success with no response body

  /* ===== CLIENT ERRORS ===== */
  BAD_REQUEST: 400, // Invalid or missing request data
  UNAUTHORIZED: 401, // Authentication required or failed
  FORBIDDEN: 403, // Authenticated but no permission
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // HTTP method not allowed
  CONFLICT: 409, // Duplicate or conflicting data
  PAYLOAD_TOO_LARGE: 413, // Uploaded file too large
  UNSUPPORTED_MEDIA: 415, // Invalid Content-Type
  UNPROCESSABLE_ENTITY: 422, // Logical validation error
  TOO_MANY_REQUESTS: 429, // Rate limit / too many attempts

  /* ===== SERVER ERRORS ===== */
  INTERNAL_SERVER_ERROR: 500, // Unexpected server failure
  SERVICE_UNAVAILABLE: 503, // Server or DB temporarily unavailable
};
