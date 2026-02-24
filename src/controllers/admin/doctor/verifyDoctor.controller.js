import { verifyDoctorProfileService } from "../../../services/admin/doctor/verifyDoctor.service.js";
import { respond } from "../../../utils/respond.js";

export const verifyDoctorProfileController = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    const serviceResponse = await verifyDoctorProfileService(profileId);
    respond.success(res, serviceResponse);
  } catch (err) {
    next(err);
  }
};
