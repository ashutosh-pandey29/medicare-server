import express from "express";
import { authorizedRole } from "../../middlewares/role.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { maintenanceModeController } from "../../controllers/admin/settings/settings.controller.js";

const router = express.Router();

router.patch(
  "/maintenance-mode",
  authMiddleware, authorizedRole("admin"),
  maintenanceModeController
);


export default router;