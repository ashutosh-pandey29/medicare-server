import { env } from "../config/env.js";
import { verifyJwtToken } from "../helpers/jwt.helper.js";
import { ApiError } from "../utils/apiError.js";
import { HTTP_CODES } from "../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../utils/messages/auth.message.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // Check authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.ACCESS_DENIED);
    }

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.ACCESS_DENIED);
    }
    // verify access token
    const decodedPayload = verifyJwtToken(token, env.JWT_ACCESS_TOKEN);
    if (!decodedPayload) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.TOKEN_INVALID);
    }
    req.user = decodedPayload;
    next();
  } catch (err) {
    next(err);
  }
};
