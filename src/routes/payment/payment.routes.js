import express from "express";
import {
  createPaymentController,
  verifyPaymentController,
  getPaymentByIdController,
  getPaymentController,
} from "../../controllers/payment/index.controller.js";
import { optionalAuth } from "../../middlewares/optionalAuth.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/details", getPaymentController); // sort info
router.get("/details/:paymentId", getPaymentByIdController); // full info

router.post("/create-order", authMiddleware, createPaymentController);
router.post("/verify-payment", authMiddleware, verifyPaymentController);

// router.get("/stats", paymentStatsController);

export default router;
