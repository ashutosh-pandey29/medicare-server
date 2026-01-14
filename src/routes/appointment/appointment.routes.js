import express from "express";

const router = express.Router();

//! get all appointment , access level admin
router.get("/all", getAllAppointmentController);

//! add new appointment
router.get("/new", newAppointmentController);

//! update appointment  ,  access level : admin
router.put("/update", updateAppointment, Controller);

//! update status , access level : user ,
router.put("/update/AppointmentId", updateAppointment);

//! delete appointment , access level : user
router.delete("/delete/appointmentId", deleteAppointmentController);

//! get appointment by specific doctor , access level : doctor , admin
router.get("/doctor/doctorId", getAppointmentsByDoctorController);

//! Get appointments for a specific patient , access level : doctor , user
router.get("/patient/:patientId", getAppointmentsByPatientController);

//! Get upcoming appointments (user dashboard);
router.get("/upcoming", getUpcomingAppointmentsController);

//! Get appointment stats (total appointments, pending, completed, cancelled) ,  access level : admin ,  doctor ,  user
router.get("/stats", appointmentStatsController);

export default router; 
