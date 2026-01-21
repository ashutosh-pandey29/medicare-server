import express from "express";
const router = express.Router();

//! Authentication and authorization related routes
import authRoutes from "./auth/auth.routes.js";

//! Department management routes (admin / public)
import departmentRoutes from "./department/department.routes.js";

//! Notification routes for admin, doctor, and users
import notificationRoutes from "./notification/notification.routes.js";

//! Doctor self routes (profile, availability, updates)
import doctorRoutes from "./doctor/doctor.routes.js";

//! Admin routes for managing and verifying doctors
import doctorRoutesOfAdmin from "./admin/doctor.routes.js";

//! appointment routes
import appointmentRoutes from "./appointment/appointment.routes.js";



router.use("/auth", authRoutes);

router.use("/department", departmentRoutes);

router.use("/notification", notificationRoutes);

router.use("/appointment", appointmentRoutes);

router.use("/doctor", doctorRoutes);

router.use("/admin", doctorRoutesOfAdmin);

export default router;
