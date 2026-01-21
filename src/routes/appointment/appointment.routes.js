import express from "express";
const router = express.Router();

import {
  deleteAppointmentController,
  getAllAppointmentController,
  getAppointmentsByDoctorController,
  getUpcomingAppointmentsController,
  newAppointmentController,
  updateAppointmentController,
  getAppointmentsByPatientController,
  getAppointmentByIdController,
} from "../../controllers/appointment/index.controller.js";

import { optionalAuth } from "../../middlewares/optionalAuth.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizedRole } from "../../middlewares/role.middleware.js";

// //! get all appointment , access level user doctor
router.get("/get", authMiddleware, authorizedRole("user"), getAllAppointmentController); //  list

// //! get appointment by id (get specific appointment )
router.get(
  "/get/:appointmentId",
  authMiddleware,
  authorizedRole("user", "doctor"),
  getAppointmentByIdController
); // full

// //! add new appointment
router.post("/new", optionalAuth, newAppointmentController);

// //! update status and appointment info , access level : user ,doctor
router.put(
  "/update/:appointmentId",
  authMiddleware,
  authorizedRole("user", "doctor"),
  updateAppointmentController
);

// //! delete appointment , access level : user
router.delete(
  "/delete/:appointmentId",
  authMiddleware,
  authorizedRole("user"),
  deleteAppointmentController
);

// //! get appointment by specific doctor , access level : doctor , admin
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  authorizedRole("doctor"),
  getAppointmentsByDoctorController
);

// //! Get appointments for a specific patient , access level : doctor , user
router.get(
  "/patient/:patientId",
  authMiddleware,
  authorizedRole("doctor"),
  getAppointmentsByPatientController
);

// //! Get upcoming appointments (user dashboard);
router.get("/upcoming", authMiddleware, authorizedRole("user"), getUpcomingAppointmentsController);

// //! Get appointment stats (total appointments, pending, completed, cancelled) ,  access level : admin ,  doctor ,  user
// router.get("/stats", appointmentStatsController);

export default router;
