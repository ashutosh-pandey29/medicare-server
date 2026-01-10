import { env } from "../../config/env.js";
import { generateUniqueUsername } from "../../helpers/generateUniqueUsername.js";
import { generateJwtToken } from "../../helpers/jwt.helper.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const googleLoginService = async (profile) => {
  if (!profile) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Profile Not found");
  }
  const REFRESH_TOKEN_EXPIRY_DAYS = 30;

  const email = profile.emails[0].value;

  // first check user exist or not

  let user = await db.fetchOne(User, { email });

  if (user && user.provider !== "google") {
    throw new ApiError(
      HTTP_CODES.CONFLICT,
      "This email is already registered using another login method"
    );
  }

  // if user not found -> create and if found then login

  if (!user) {
    let username;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;

    do {
      username = generateUniqueUsername(profile.displayName);
      attempts++;
    } while (attempts < MAX_ATTEMPTS && (await db.exists(User, { username })));

    if (attempts === MAX_ATTEMPTS) {
      throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Unable to generate unique username");
    }

    const data = {
      username,
      email,
      isEmailVerified: profile.emails[0].verified,
      provider: "google",
      providerId: profile.id,
    };

    // create user

    user = await db.createOne(User, data);

    if (!user) {
      throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "User creation failed");
    }
  }

  // Prepare payload for JWT token
  const payload = {
    userId: user._id,
    role: user.role,
    username: user.username,
  };

  // generate access  token
  const accessToken = generateJwtToken(payload, env.JWT_ACCESS_TOKEN, env.JWT_ACCESS_TOKEN_EXPIRES);

  // generate refresh token
  const refreshToken = generateJwtToken(
    payload,
    env.JWT_REFRESH_TOKEN,
    env.JWT_REFRESH_TOKEN_EXPIRES
  );

  await db.updateOne(
    User,
    { _id: user._id },
    {
      $set: {
        refreshToken: refreshToken,
        refreshTokenExpireAt: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
        ),
      },
    }
  );

  // success - Return tokens to controller
  return {
    refreshToken: refreshToken,
  };
};
