/**
 * Purpose:
 * Handles new user registration.
 
 * When it is used:
 * Called when a user creates a new account using username  ,  email and password.
 
 * Access:
 * Public route.
 */


import { registerService } from "../../services/auth/register.service.js";
import { respond } from "../../utils/respond.js";

export const registerController = async (req, res, next) => {
  try {
    // Call service layer to handle registration logic
    const serviceResponse = await registerService(req.body);

    // Send standardized success response
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
