/**
 * Authentication Middleware
 * --------------------------
 * Purpose:
 * - Validates JWT access token
 * - Attaches decoded user payload to req.user
 * - Blocks unauthorized requests
 */

// Import environment configuration (JWT secret)
import { env } from "../config/env.js";

// Import helper function to verify JWT token
import { verifyJwtToken } from "../helpers/jwt.helper.js";

// Import custom API error class
import { ApiError } from "../utils/apiError.js";

// Import centralized HTTP status codes
import { HTTP_CODES } from "../utils/httpCodes.js";

// Import authentication-related messages
import { AUTH_MESSAGES } from "../utils/messages/auth.message.js";

export const authMiddleware = (req, res, next) => {
  try {
    // Extract Authorization header from request
    const authHeader = req.headers["authorization"];

    // Check if Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.ACCESS_DENIED);
    }

    // Extract token from header
    const token = authHeader && authHeader.split(" ")[1];

    // If token is missing
    if (!token) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.ACCESS_DENIED);
    }

    // Verify JWT token using secret key
    const decodedPayload = verifyJwtToken(token, env.JWT_ACCESS_TOKEN);

    // If token is invalid or expired
    if (!decodedPayload) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.TOKEN_INVALID);
    }

    // Attach decoded user data to request object
    req.user = decodedPayload;

    // Proceed to next middleware/controller
    next();
  } catch (err) {
    // Pass error to global error handler
    next(err);
  }
};
