import express from "express";
const router = express.Router();

import authRoutes from "./auth/auth.routes.js";
import departmentRoutes from "./department/department.routes.js";
import notificationRoutes from "./notification/notification.routes.js";
import doctorRoutes from "./doctor/doctor.routes.js";
router.use("/auth", authRoutes);
router.use("/notification", notificationRoutes);
router.use("/department", departmentRoutes);
router.use("/doctor", doctorRoutes);

export default router;
