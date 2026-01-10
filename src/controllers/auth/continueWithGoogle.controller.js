/**
 * Purpose:
 * Handles social login (Google, GitHub, etc.).
 *
 * When it is used:
 * Called when a user logs in using a social provider.
 *
 * Access:
 * Public route.
 */

import { env } from "../../config/env.js";
import { googleLoginService } from "../../services/auth/googleLogin.service.js";
import { setCookie } from "../../utils/cookie.js";

export const continueWithGoogleController = async (req, res, next) => {
  try {
    const profile = req.user;

    const {refreshToken } = await googleLoginService(profile);

    // Set refresh token in httpOnly cookie (secure storage)
    // Access token will be sent in response body for client-side use
    setCookie(res, refreshToken);

    console.log(env.FRONTEND_URL);
    // redirect to website
    return res.redirect(`${env.FRONTEND_URL}`);
  } catch (err) {
    // console.log(err);
    // next(err)

    return res.redirect(`${env.FRONTEND_URL}/auth/login?error=ACCOUNT_EXISTS`);
  }
};
