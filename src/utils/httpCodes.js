/**
 * Centralized HTTP Status Codes
 * Used across controllers, services, and middlewares
 */

export const HTTP_CODES = {
  /* ================= SUCCESS ================= */
  OK: 200, // Request completed successfully
  CREATED: 201, // Resource created successfully
  ACCEPTED: 202, // Request accepted for async processing
  NO_CONTENT: 204, // Success but no response body

  /* ================= CLIENT ERRORS ================= */
  BAD_REQUEST: 400, // Invalid request payload or parameters
  UNAUTHORIZED: 401, // Authentication required or failed
  FORBIDDEN: 403, // Authenticated but access denied
  NOT_FOUND: 404, // Resource not found
  METHOD_NOT_ALLOWED: 405, // HTTP method not supported
  CONFLICT: 409, // Duplicate resource or conflict
  PAYLOAD_TOO_LARGE: 413, // File size exceeds limit
  UNSUPPORTED_MEDIA_TYPE: 415, // Invalid Content-Type
  UNPROCESSABLE_ENTITY: 422, // Validation or business logic error
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded

  /* ================= SERVER ERRORS ================= */
  INTERNAL_SERVER_ERROR: 500, // Unexpected server error
  NOT_IMPLEMENTED: 501, // Feature not implemented
  BAD_GATEWAY: 502, // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503, // Server or database unavailable
};
