import { rollbackDoctorService } from "../../../services/admin/rollbackDoctor.service.js";
import { respond } from "../../../utils/respond.js";

export const rollbackDoctorController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const serviceResponse = await rollbackDoctorService(userId);
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
