import { getAllAppointmentService } from "../../services/appointment/getAllAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const getAllAppointmentController = async (req, res, next) => {
  try {
    const serviceResponse = await getAllAppointmentService();
    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
