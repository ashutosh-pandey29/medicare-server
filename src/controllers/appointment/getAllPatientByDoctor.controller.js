import { getAllPatientByDoctorService } from "../../services/appointment/getAllPatientByDoctor.service.js";
import { respond } from "../../utils/respond.js";

export const getAllPatientByDoctorController = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const serviceResponse = await getAllPatientByDoctorService(userId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
