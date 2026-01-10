/**
  *
 * Purpose:
 * - Represents exceptions and unexpected errors in a standardized way.
 * - Allows controllers/services to throw errors.
 * - Works with global error handler to send uniform JSON response.
 *
 * Usage:
 *   throw new ApiError(statusCode, message);
 */

export class ApiError extends Error {
  constructor(statusCode = 400, message = "Something went wrong", errors = []) {
    super(message);           // Calling parent Error constructor
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor); // Clean stack trace
  }
}