import express from "express";
import {
  createPaymentController,
  verifyPaymentController,
  getPaymentByIdController,
  getPaymentController,
} from "../../controllers/payment/index.controller.js";
const router = express.Router();

router.get("/details", getPaymentController); // sort info
router.get("/details/:paymentId", getPaymentByIdController); // full info

router.post("/create-order", createPaymentController);
router.post("/verify-payment", verifyPaymentController);

// router.get("/stats", paymentStatsController);

export default router;
