import { getDoctorByDepartmentIdService } from "../../services/doctor/getDoctorByDepartmentId.service.js";
import { respond } from "../../utils/respond.js";

export const getDoctorByDepartmentIdController = async (req, res, next) => {
  try {
    const { departmentId } = req.params;

    const serviceResponse = await getDoctorByDepartmentIdService(departmentId);

    respond.success(res, serviceResponse);
  } catch (err) {
    // pass error to global error handler
    next(err);
  }
};
