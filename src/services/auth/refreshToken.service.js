import { env } from "../../config/env.js";
import { generateJwtToken, verifyJwtToken } from "../../helpers/jwt.helper.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";

export const refreshTokenService = async (refreshToken) => {
  // verify refreshTOken

  const decoded = verifyJwtToken(refreshToken, env.JWT_REFRESH_TOKEN);

  // console.log("decoded", decoded);

  const user = await db.fetchOne(User, { _id: decoded.userId }, "+refreshToken");
  // console.log("user ser : ", user);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(HTTP_CODES.UNAUTHORIZED, AUTH_MESSAGES.TOKEN_INVALID);
  }

  const newAccessToken = generateJwtToken(
    { userId: user._id, role: user.role, username: user.username },
    env.JWT_ACCESS_TOKEN,
    env.JWT_ACCESS_TOKEN_EXPIRES
  );

  const newRefreshToken = generateJwtToken(
    { userId: user._id, role: user.role, username: user.username },
    env.JWT_REFRESH_TOKEN,
    env.JWT_REFRESH_TOKEN_EXPIRES
  );

  // rotate refresh token
  await db.updateOne(
    User,
    { _id: user._id },
    {
      $set: {
        refreshToken: newRefreshToken,
        refreshTokenExpireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
