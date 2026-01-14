import { getPublicDepartmentService } from "../../services/department/getPublicDepartment.service.js";
import { respond } from "../../utils/respond.js";

export const getPublicDepartmentsController = async (req, res, next) => {
  try {
    const response = await getPublicDepartmentService();
    respond.success(res, response);
  } catch (err) {
    //pass error to global Error Handler
    next(err);
  }
};
