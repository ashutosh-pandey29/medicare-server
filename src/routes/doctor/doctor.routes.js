import express from "express";
const router = express.Router();
import {
  createDoctorProfileController,
  getDoctorProfileController,
  updateDoctorProfileController,
} from "../../controllers/doctor/index.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { payloadValidator } from "../../middlewares/validator.middleware.js";
import { doctorProfileValidation } from "../../Schemas/profile.schema.js";
/* ================= DOCTOR PROFILE ================= */

// get own profile
router.get("/me", authMiddleware, getDoctorProfileController);

// create  profile
router.post(
  "/profile",
  authMiddleware,
  payloadValidator(doctorProfileValidation),
  createDoctorProfileController
); // first time

router.put("/profile", authMiddleware, updateDoctorProfileController); // edit

/* ================= APPOINTMENTS ================= */

// router.get("/appointments", getDoctorAppointmentsController); //list - sort detail
// router.get("/appointments/:appointmentId", getDoctorAppointmentByIdController); // view - full details

/* ================= PATIENTS ================= */

// router.get("/patients", getDoctorPatientsController); //list - sort detail
// router.get("/patients/:patientId", getDoctorPatientByIdController); //view -> full details

// create report

// router.post("/patients/:patientId/reports", createMedicalReportController);

export default router;
