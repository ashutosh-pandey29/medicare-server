/**
 * Purpose:
 *  Global error handler middleware.
 *  Catches all thrown errors and sends uniform JSON responses.
 *  Works with both ApiError and unexpected errors.
 */

// Standardized response helper
import { respond } from "../utils/respond.js";

// Centralized HTTP status codes
import { HTTP_CODES } from "../utils/httpCodes.js";

// Default server messages
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";

// Zod validation error class
import { ZodError } from "zod";

export const globalErrorHandler = (err, req, res, next) => {
  // Handle Zod validation errors separately
  if (err instanceof ZodError) {
    // Format Zod validation issues into readable structure
    const errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    // Send standardized validation failure response
    return respond.fail(res, {
      statusCode: HTTP_CODES.BAD_REQUEST,
      message: "Validation failed",
      errors,
    });
  }

  // Extract status code (default: 500 Internal Server Error)
  const status = err.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR;

  // Extract error message (fallback to default server message)
  const message = err.message || SERVER_MESSAGES.INTERNAL_SERVER_ERROR;

  // Extract detailed errors array if provided
  const errors = err.errors || [];

  // Send standardized failure response
  return respond.fail(res, { statusCode: status, message, errors });
};
