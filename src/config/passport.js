// Import passport for authentication
import passport from "passport";

// Import Google OAuth strategy
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Import environment variables
import { env } from "./env.js";

// Configure Google authentication strategy
passport.use(
  new GoogleStrategy(
    {
      // Google App credentials
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,

      // URL where Google will redirect after login
      callbackURL: `${env.GOOGLE_CALLBACK_URL}/api/v1/auth/google/callback`,
    },

    // This function runs after successful Google authentication
    function (accessToken, refreshToken, profile, cb) {
      try {
        // profile contains user data from Google
        // We are passing the profile to next step
        cb(null, profile);
      } catch (err) {
        // If any error occurs, pass error
        return cb(err, null);
      }
    }
  )
);
