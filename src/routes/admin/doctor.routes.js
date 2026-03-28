import express from "express";
const router = express.Router();

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizedRole } from "../../middlewares/role.middleware.js";
import {
  getDoctorByIdController,
  getDoctorController,
  rollbackDoctorController,
  verifyDoctorProfileController,
} from "../../controllers/admin/index.controller.js";

//! Get all doctors with basic details and verification status access label -admin
router.get("/doctors", getDoctorController);

//! Get complete doctor profile details for review , access label -admin
router.get("/doctors/:profileId", getDoctorByIdController);

//! Admin verifies or rejects a doctor profile after reviewing full details , access label -admin
router.patch(
  "/doctor/:profileId/verify",
  authMiddleware,
  authorizedRole("admin"),
  verifyDoctorProfileController
);

//! rollback doctor role(doctor to normal user)
router.patch(
  "/doctor/:userId/rollback",
  authMiddleware,
  authorizedRole("admin"),
  rollbackDoctorController
);

export default router;
