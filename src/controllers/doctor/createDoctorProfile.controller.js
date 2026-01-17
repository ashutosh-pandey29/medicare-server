import { createDoctorProfileService } from "../../services/doctor/createDoctorProfile.service.js";
import { respond } from "../../utils/respond.js";

export const createDoctorProfileController = async (req, res, next) => {
  try {
    const payload = req.body;
    const userId = req.user.userId;
    const serviceResponse = await createDoctorProfileService(payload, userId);
    
    // console.log(payload);
    respond.success(res, serviceResponse);
  } catch (err) {
    //passing error to global error handler
    next(err);
  }
};
