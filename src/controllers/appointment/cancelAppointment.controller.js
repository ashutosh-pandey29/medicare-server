import { cancelAppointmentService } from "../../services/appointment/cancelAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const cancelAppointmentController = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    const serviceResponse = await cancelAppointmentService(appointmentId);

    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
