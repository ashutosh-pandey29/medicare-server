import { createDoctorProfileService } from "../../services/doctor/createDoctorProfile.service.js";
import { respond } from "../../utils/respond.js";

export const createDoctorProfileController = async (req, res, next) => {
  try {
    const payload = req.body;
    // const userId = req.user.userId;
    const userId = "6966b32ef737cfba9745c7b5";
    const serviceResponse = await createDoctorProfileService(payload ,  userId);
    respond.success(res, serviceResponse);
  } catch (err) {
    //passing error to global error handler
    next(err);
  }
};
