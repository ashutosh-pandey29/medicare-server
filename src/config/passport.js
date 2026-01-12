import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.GOOGLE_CALLBACK_URL}/api/v1/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      try {
        cb(null, profile);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
