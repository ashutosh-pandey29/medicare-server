import express from "express";
import { authorizedRole } from "../../middlewares/role.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  backupDBController,
  getMaintenanceModeStatusController,
  maintenanceModeController,
} from "../../controllers/admin/settings/settings.controller.js";

const router = express.Router();

router.get(
  "/maintenance-mode",
  authMiddleware,
  authorizedRole("admin"),
  getMaintenanceModeStatusController
);

router.patch(
  "/maintenance-mode",
  authMiddleware,
  authorizedRole("admin"),
  maintenanceModeController
);

router.get("/backup-db", authMiddleware, authorizedRole("admin"), backupDBController);

export default router;
