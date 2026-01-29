import { getUpcomingAppointmentService } from "../../services/appointment/upcomingAppointment.service.js";
import { respond } from "../../utils/respond.js";

export const getUpcomingAppointmentsController = async (req, res, next) => {
  try {
    const userId = req.user?.userId || null;
    const serviceResponse = await getUpcomingAppointmentService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // passing error to global error handler
    next(err);
  }
};
