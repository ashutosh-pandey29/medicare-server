// Import express framework
import express from "express";

// Create new router instance
const router = express.Router();

// Import doctor profile controllers
import {
  createDoctorProfileController,
  getDoctorProfileController,
  updateDoctorProfileController,
  getDoctorByDepartmentIdController,
} from "../../controllers/doctor/index.controller.js";


// Import authentication middleware (JWT verification)
import { authMiddleware } from "../../middlewares/auth.middleware.js";

// Import request payload validation middleware
import { payloadValidator } from "../../middlewares/validator.middleware.js";

// Import doctor profile validation schema (Zod/etc.)
import { doctorProfileValidation } from "../../Schemas/profile.schema.js";

// Import role-based authorization middleware
import { authorizedRole } from "../../middlewares/role.middleware.js";


/* ================= DOCTOR PROFILE ROUTES ================= */

// Get logged-in doctor's own profile
router.get("/me", authMiddleware, authorizedRole("doctor"), getDoctorProfileController);

// Create doctor profile (first-time setup)
router.post(
  "/profile",
  authMiddleware,
  authorizedRole("doctor"),
  payloadValidator(doctorProfileValidation),
  createDoctorProfileController
); // first time

// Update existing doctor profile
router.put(
  "/profile",
  authMiddleware,
  authorizedRole("doctor"),
  payloadValidator(doctorProfileValidation),
  updateDoctorProfileController
); // edit


// Get doctors by department ID
router.get(
  "/:departmentId",
  authMiddleware,
  authorizedRole("doctor"),
  getDoctorByDepartmentIdController
);

export default router;
