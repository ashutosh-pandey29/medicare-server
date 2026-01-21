import { getAppointmentByPatientService } from "../../services/appointment/getAppointmentByPatient.service.js";
import { respond } from "../../utils/respond.js";

export const getAppointmentsByPatientController = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const serviceResponse = await getAppointmentByPatientService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
