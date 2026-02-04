import { statsService } from "../../../services/admin/stats/stats.service.js";
import { respond } from "../../../utils/respond.js";

export const getStatsController = async (req, res, next) => {
  try {
    const serviceResponse = await statsService();
    return respond.success(res, serviceResponse);
  } catch (err) {
    next(err);
  }
};
