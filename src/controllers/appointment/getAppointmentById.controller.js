import { getAppointmentByIdService } from "../../services/appointment/getAppointmentById.service.js";
import { respond } from "../../utils/respond.js";

export const getAppointmentByIdController = async (req ,  res  ,  next) => {
  try {
    const { appointmentId } = req.params;
    
    const serviceResponse = await getAppointmentByIdService(appointmentId);
    
      respond.success(res, serviceResponse);

  } catch (err) {
    //pass error to global error handler
    next(err);

  }
}