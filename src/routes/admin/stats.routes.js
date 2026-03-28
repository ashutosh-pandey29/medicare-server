import express from "express";
import { getStatsController } from "../../controllers/admin/stats/getStats.controller.js";
import {
  patientGraphController,
  revenueGraphController,
} from "../../controllers/admin/stats/getGraphs.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizedRole } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/get", authMiddleware, authorizedRole("admin"), getStatsController);
router.get("/revenue", authMiddleware, authorizedRole("admin"), revenueGraphController);
router.get("/patient", authMiddleware, authorizedRole("admin"), patientGraphController);

export default router;
