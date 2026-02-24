// Import service layer function to fetch doctors
import { getDoctorByIdService } from "../../../services/admin/doctor/getDoctorById.service.js";

// Import standardized response handler
import { respond } from "../../../utils/respond.js";

export const getDoctorByIdController = async (req, res, next) => {
  try {
    const { profileId } = req.params;

    // Call service layer to get doctor data
    const serviceResponse = await getDoctorByIdService(profileId);

    // Send standardized success response
    respond.success(res, serviceResponse);
  } catch (err) {
    //pass error to global error  handler
    next(err);
  }
};
