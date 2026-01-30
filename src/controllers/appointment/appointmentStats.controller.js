import { appointmentStatsService } from "../../services/appointment/appointmentStats.service.js";
import { respond } from "../../utils/respond.js";

export const appointmentStatsController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const serviceResponse = await appointmentStatsService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
