import express from "express";
const router = express.Router();
import {
  createDoctorProfileController,
  getDoctorProfileController,
  updateDoctorProfileController,
} from "../../controllers/doctor/index.controller.js";

/* ================= DOCTOR PROFILE ================= */

// get own profile
router.get("/me", getDoctorProfileController);

// create OR update profile
router.post("/profile", createDoctorProfileController); // first time
router.put("/profile", updateDoctorProfileController); // edit

/* ================= APPOINTMENTS ================= */

// router.get("/appointments", getDoctorAppointmentsController); //list - sort detail
// router.get("/appointments/:appointmentId", getDoctorAppointmentByIdController); // view - full details

/* ================= PATIENTS ================= */

// router.get("/patients", getDoctorPatientsController); //list - sort detail
// router.get("/patients/:patientId", getDoctorPatientByIdController); //view -> full details

// create report

// router.post("/patients/:patientId/reports", createMedicalReportController);

export default router;
