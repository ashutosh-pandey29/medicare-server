import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
  meController,
  refreshTokenController,
  updatePasswordController,
  continueWithGoogleController,
} from "../../controllers/auth/index.controller.js";

import { payloadValidator } from "../../middlewares/validator.middleware.js";
import { registrationSchema } from "../../Schemas/register.schema.js";
import { loginSchema } from "../../Schemas/login.schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { accountSchema } from "../../Schemas/account.schema.js";
import { updateAccountController } from "../../controllers/auth/updateAccount.controller.js";
import passport from "passport";
import { env } from "../../config/env.js";

const router = express.Router();

// -------------------- AUTH ROUTES --------------------

//! Register a new user account
router.post("/register", payloadValidator(registrationSchema), registerController); // Public: Creates a new user

//! Login user with email or username and password
router.post("/login", payloadValidator(loginSchema), loginController); // Public: Returns access & refresh tokens

//! Verify user email using verification token
router.get("/verify-email/:token", verifyEmailController); // Public: Confirms email after registration

//! Forgot password: send reset email
router.post("/forgot-password", forgotPasswordController); // Public: Sends password reset link

//! Reset password using reset token
router.post("/reset-password", resetPasswordController); // Public: Resets password with valid token

//! Refresh access token using refresh token
router.get("/refresh-token", refreshTokenController); // public: Rotates refresh token & issues new access token

//! Change user password while logged in
router.put("/update-password", authMiddleware, updatePasswordController); // Protected: Updates password for logged-in user

//! Get currently logged-in user's profile
router.get("/me", authMiddleware, meController); // Protected: Returns user profile

//! update logged in user , username and email

router.put(
  "/update-account",
  payloadValidator(accountSchema),
  authMiddleware,
  updateAccountController
);

//! update password of logged in user

//! Logout the currently authenticated user
router.post("/logout", authMiddleware, logoutController); // Protected: Deletes refresh token and clears cookie

// -------------------- SOCIAL LOGIN --------------------
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] })); // Public
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${env.FRONTEND_URL}/auth/login?error=GOOGLE_CANCELLED`,
  }),
  continueWithGoogleController
);

export default router;
