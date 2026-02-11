import express from "express";
const router = express.Router();
import {
  createDoctorProfileController,
  getDoctorProfileController,
  updateDoctorProfileController,
  getDoctorByDepartmentIdController,
} from "../../controllers/doctor/index.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { payloadValidator } from "../../middlewares/validator.middleware.js";
import { doctorProfileValidation } from "../../Schemas/profile.schema.js";
import { authorizedRole } from "../../middlewares/role.middleware.js";
/* ================= DOCTOR PROFILE ================= */

// get own profile
router.get("/me", authMiddleware, authorizedRole("doctor"), getDoctorProfileController);

// create  profile
router.post(
  "/profile",
  authMiddleware,
  authorizedRole("doctor"),
  payloadValidator(doctorProfileValidation),
  createDoctorProfileController
); // first time

router.put(
  "/profile",
  authMiddleware,
  authorizedRole("doctor"),
  payloadValidator(doctorProfileValidation),
  updateDoctorProfileController
); // edit

router.get(
  "/:departmentId",
  authMiddleware,
  authorizedRole("doctor"),
  getDoctorByDepartmentIdController
);

export default router;
