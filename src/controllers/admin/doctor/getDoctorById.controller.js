import { getDoctorByIdService } from "../../../services/admin/getDoctorById.service.js";
import { respond } from "../../../utils/respond.js";

export const getDoctorByIdController = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    
    const serviceResponse = await getDoctorByIdService(profileId);

    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error  handler
    next(err);
  }
};
