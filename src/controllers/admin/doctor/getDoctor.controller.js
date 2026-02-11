// Import service layer function to fetch doctors
import { getDoctorService } from "../../../services/admin/getDoctor.service.js";

// Import standardized response handler
import { respond } from "../../../utils/respond.js";

export const getDoctorController = async (req, res, next) => {
  try {
    // Call service layer to get doctor data
    const serviceResponse = await getDoctorService();

    // Send standardized success response
    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
