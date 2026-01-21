import { deleteAppointmentService } from "../../services/appointment/deleteAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const deleteAppointmentController = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    const serviceResponse = await deleteAppointmentService(appointmentId);

    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error handler
    next(err);
  }
};
