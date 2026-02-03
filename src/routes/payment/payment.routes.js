import express from "express";
import {
  createPaymentController,
  verifyPaymentController,
  getPaymentByIdController,
  getPaymentController,
  downloadInvoiceController,
  getAllPaymentController
} from "../../controllers/payment/index.controller.js";
import { optionalAuth } from "../../middlewares/optionalAuth.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const router = express.Router();


// all payment for admin 

router.get("/all", authMiddleware,  getAllPaymentController); 

router.get("/details", authMiddleware, getPaymentController); // sort info
router.get("/details/:paymentId", getPaymentByIdController); // full info

router.post("/create-order", authMiddleware, createPaymentController);
router.post("/verify-payment", authMiddleware, verifyPaymentController);

router.get("/download-invoice/:paymentId",authMiddleware,  downloadInvoiceController);

// router.get("/stats", paymentStatsController);

export default router;
