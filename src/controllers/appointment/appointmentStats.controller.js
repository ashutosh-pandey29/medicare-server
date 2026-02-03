import { appointmentStatsService } from "../../services/appointment/appointmentStats.service.js";
import { respond } from "../../utils/respond.js";

export const appointmentStatsController = async (req, res, next) => {
  try {
    const user = req.user;
    const serviceResponse = await appointmentStatsService(user);

    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
