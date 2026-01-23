import { verifyPaymentService } from "../../services/payment/verifyPayment.service.js";
import { respond } from "../../utils/respond.js";

export const verifyPaymentController = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    const serviceResponse = await verifyPaymentService(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      appointmentId
    );

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
