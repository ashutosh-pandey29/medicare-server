import { createPaymentService } from "../../services/payment/createPayment.service.js";
import { respond } from "../../utils/respond.js";

export const createPaymentController = async (req, res  ,next) => {
  try {
    const { appointmentId } = req.body;
    const serviceResponse = await createPaymentService(appointmentId);
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
