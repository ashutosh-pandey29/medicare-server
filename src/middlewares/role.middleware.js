import { ApiError } from "../utils/apiError.js";
import { HTTP_CODES } from "../utils/httpCodes.js";
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";

export const authorizedRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, SERVER_MESSAGES.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(HTTP_CODES.FORBIDDEN, SERVER_MESSAGES.FORBIDDEN);
    }

    next();
  };
};
