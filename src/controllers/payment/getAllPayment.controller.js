import { getAllPaymentService } from "../../services/payment/getAllPayment.service.js";
import { respond } from "../../utils/respond.js";


export const getAllPaymentController = async (req, res, next) => {
  try {
    const serviceResponse  =  await getAllPaymentService();

    respond.success(res ,  serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
