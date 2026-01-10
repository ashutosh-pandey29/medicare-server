import express from "express";
import { saveSubscriptionController,deleteSubscriptionController } from "../../controllers/notification/index.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/saveSubscription", authMiddleware, saveSubscriptionController);
router.delete("/deleteSubscription" , authMiddleware, deleteSubscriptionController);

export default router;
