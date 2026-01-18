import { updateDoctorProfileService } from "../../services/doctor/updateDoctorProfile.service.js";
import { respond } from "../../utils/respond.js";

export const updateDoctorProfileController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const payload = req.body;

    const serviceResponse = await updateDoctorProfileService(payload, userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    //passing error to global error handler

    next(err);
  }
};
