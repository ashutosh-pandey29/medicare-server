/**
 * Purpose:
 *  Global error handler middleware.
 *  Catches all thrown errors and sends uniform JSON responses.
 *  Works with both ApiError and unexpected errors.
 */

import { respond } from "../utils/respond.js";
import { HTTP_CODES } from "../utils/httpCodes.js";
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";
import { ZodError } from "zod";

export const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = err.issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return respond.fail(res, {
      statusCode: HTTP_CODES.BAD_REQUEST,
      message: "Validation failed",
      errors,
    });
  }

  const status = err.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || SERVER_MESSAGES.INTERNAL_SERVER_ERROR;
  const errors = err.errors || [];

    console.error("ERROR:", err);


  return respond.fail(res, { statusCode: status, message, errors });
};
