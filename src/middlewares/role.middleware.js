//! Import custom API error class for standardized error handling
import { ApiError } from "../utils/apiError.js";

//! Import centralized HTTP status codes
import { HTTP_CODES } from "../utils/httpCodes.js";

//! Import predefined server response messages
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";

//! Role-based authorization middleware
export const authorizedRole = (...allowedRoles) => {
  //! Return middleware function
  return (req, res, next) => {
    //! Check if user is attached to request (set by authMiddleware)
    if (!req.user) {
      throw new ApiError(HTTP_CODES.UNAUTHORIZED, SERVER_MESSAGES.UNAUTHORIZED);
    }

    //! Check if user's role is included in allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(HTTP_CODES.FORBIDDEN, SERVER_MESSAGES.FORBIDDEN);
    }

    //! If role is valid, proceed to next middleware/controller
    next();
  };
};
