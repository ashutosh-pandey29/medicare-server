import rateLimit from "express-rate-limit";
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";
import { ApiError } from "../utils/apiError.js";
import { HTTP_CODES } from "../utils/httpCodes.js";

export const rateLimiter = rateLimit({
  // Time window in milliseconds (1 minute)
  windowMs: 60 * 1000, // 1 minuit

  // Maximum number of requests allowed within the time window
  max: 100,

  /**
   * Custom handler when rate limit is exceeded.
   * Instead of sending default response,
   * we forward a structured ApiError to the global error handler.
   */
  handler: (req, res, next) => {
    return next(new ApiError(HTTP_CODES.TOO_MANY_REQUESTS, SERVER_MESSAGES.TOO_MANY_REQ));
  },
  // Enable modern rate limit headers
  standardHeaders: true,

  // Disable old rate limit headers
  legacyHeaders: false,
});
