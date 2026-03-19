import Setting from "../models/Settings.js";
import User from "../models/User.js";
import { db } from "../services/db/db.service.js";
import { ApiError } from "../utils/apiError.js";
import { HTTP_CODES } from "../utils/httpCodes.js";
import { SERVER_MESSAGES } from "../utils/messages/server.message.js";

export const maintenanceMode = async (req, res, next) => {
  try {
    const settings = await db.fetchOne(Setting, {});

    // Maintenance OFF —  allow everyone to proceed
    if (!settings?.maintenanceMode) return next();

    // Maintenance ON — already logged in admin can access everything
    if (req.user?.role === "admin") return next();

    // Maintenance ON — someone is trying to login
    // Allow only if the user is an admin
    if (req.path === "/api/v1/auth/login") {
      const { login_id } = req.body;
      const filter = { $or: [{ username: login_id }, { email: login_id }] };
      const user = await db.fetchOne(User, filter, "+password");

      // Admin login — allow
      if (user?.role === "admin") return next();

      // Normal user login — block (falls through to throw below)
    }
    // Maintenance ON — block everyone else with 503
    throw new ApiError(HTTP_CODES.SERVICE_UNAVAILABLE, SERVER_MESSAGES.UNDER_MAINTENANCE);
  } catch (err) {
    next(err);
  }
};
