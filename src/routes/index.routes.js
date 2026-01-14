import express from "express";
const router = express.Router();

import authRoutes from "./auth/auth.routes.js";
import departmentRoutes from "./department/department.routes.js";
import notificationRoutes from "./notification/notification.routes.js";

router.use("/auth", authRoutes);
router.use("/notification", notificationRoutes);
router.use("/department", departmentRoutes);

export default router;
