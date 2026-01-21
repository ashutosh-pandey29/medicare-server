import { env } from "../config/env.js";
import { verifyJwtToken } from "../helpers/jwt.helper.js";

// Middleware to handle both logged-in users and guests
export const optionalAuth = (req, res, next) => {
  try {
    // Get token from cookies
    // const token = req.cookies?.token;
    const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(" ")[1];
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    // console.log(token);
    // If no token, treat as guest user
    if (!token) {
      req.user = null; // for  guest user
      return next(); // continue to next middleware or controller
    }

    // Verify JWT token using helper function
    // console.log("SECRET USED:", process.env.JWT_ACCESS_TOKEN_SECRET);

    const decodedPayload = verifyJwtToken(token, env.JWT_ACCESS_TOKEN);

    // console.log("decodedPayload", decodedPayload);
    // If token invalid, treat as guest
    if (!decodedPayload) {
      req.user = null; // invalid token, still allow guest
      return next();
    }

    // Token valid  attach user info to req.user
    req.user = decodedPayload; // logged-in user info
    next();
  } catch (err) {
    //unexpected errors, pass to global error handler
    return next(err);
  }
};
