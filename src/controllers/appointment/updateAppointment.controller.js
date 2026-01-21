import { updateAppointmentService } from "../../services/appointment/updateAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const updateAppointmentController = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = req.user;
    const { appointmentId } = req.params;

    console.log(appointmentId);

    const serviceResponse = await updateAppointmentService(payload, user, appointmentId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
