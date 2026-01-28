import { getTodayConsultAppointmentsService } from "../../services/appointment/getTodayConsultAppointments.service.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { respond } from "../../utils/respond.js";

export const getTodayConsultAppointmentsController = async (req, res, next) => {
  try {
    const {userId} = req.user;

    const serviceResponse = await getTodayConsultAppointmentsService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
