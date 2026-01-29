import { getPaymentService } from "../../services/payment/getPayment.js";
import { respond } from "../../utils/respond.js";


export const getPaymentController = async (req, res, next) => {
  try {
    const {userId}  =  req.user;
    const serviceResponse  =  await getPaymentService(userId);

    respond.success(res ,  serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
