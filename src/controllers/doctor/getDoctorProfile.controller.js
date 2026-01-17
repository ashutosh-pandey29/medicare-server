import { getDoctorProfileService } from "../../services/doctor/getDoctorProfile.service.js";
import { respond } from "../../utils/respond.js";

export const getDoctorProfileController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const serviceResponse = await getDoctorProfileService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    //passing error to global error handler

    next(err);
  }
};
