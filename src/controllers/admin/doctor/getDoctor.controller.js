import { getDoctorService } from "../../../services/admin/getDoctor.service.js";
import { respond } from "../../../utils/respond.js";

export const getDoctorController = async (req, res, next) => {
  try {
 
    const serviceResponse = await getDoctorService();

    respond.success(res, serviceResponse);
    
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
