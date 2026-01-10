/**
 * Purpose:
 * Issues a new access token using a refresh token.
 *
 * When it is used:
 * Called when the access token expires.
 *
 * Access:
 * Public route (uses refresh token).
 */

import { refreshTokenService } from "../../services/auth/refreshToken.service.js";
import { setCookie } from "../../utils/cookie.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const refreshTokenController = async (req, res, next) => {
  try {
    //  Get refresh token from cookie OR header
    const oldRefreshToken = req.cookies?.refreshToken ;

    // console.log("Cookie refreshToken:", req.cookies?.refreshToken);

    if (!oldRefreshToken) {
      return respond.fail(res, {
        statusCode: HTTP_CODES.UNAUTHORIZED,
        message: "Refresh token not found",
      });
    }

    // Call service to generate new tokens

    const { accessToken, refreshToken } = await refreshTokenService(oldRefreshToken);
    setCookie(res, refreshToken);

    respond.success(res, {
      statusCode: HTTP_CODES.OK,
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
