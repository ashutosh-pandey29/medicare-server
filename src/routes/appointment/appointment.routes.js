import express from "express";
const router = express.Router();

import {
  deleteAppointmentController,
  getAllAppointmentController,
  getAppointmentsByDoctorController,
  getUpcomingAppointmentsController,
  newAppointmentController,
  updateAppointmentController,
  getAppointmentByIdController,
  cancelAppointmentController,
  getTodayConsultAppointmentsController,
  appointmentStatsController,
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

// //! Get today's appointments for consultation (doctor)
router.get(
  "/consultant",
  authMiddleware,
  authorizedRole("doctor"),
  getTodayConsultAppointmentsController
);

// //! add new appointment
router.post("/new", optionalAuth, newAppointmentController);

// //! get data for update appointment
// router.get("/update/:appointmentId" , authMiddleware ,  authorizedRole("user") ,  getUpdateAppointmentController)

// //! update appointment
router.put(
  "/update",
  authMiddleware,
  authorizedRole("user", "doctor"),
  updateAppointmentController
);

// //! cancel appointment
router.put(
  "/cancel/:appointmentId",
  authMiddleware,
  authorizedRole("user", "doctor"),
  cancelAppointmentController
);

// //! delete appointment , access level : user
router.delete(
  "/delete/:appointmentId",
  authMiddleware,
  authorizedRole("user"),
  deleteAppointmentController
);

// //! get appointment by specific doctor , access level : doctor
router.get("/doctor", authMiddleware, authorizedRole("doctor"), getAppointmentsByDoctorController);

// //! Get upcoming appointments (user dashboard);
router.get("/upcoming", authMiddleware, authorizedRole("user"), getUpcomingAppointmentsController);

// //! Get appointment stats (total appointments, pending, completed, cancelled) ,  access level : admin ,  doctor ,  user
router.get("/stats", authMiddleware, authorizedRole("user"), appointmentStatsController);

export default router;
