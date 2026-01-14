import { getAllDepartmentService } from "../../services/department/getAllDepartment.service.js";
import { respond } from "../../utils/respond.js";

export const getAllDepartmentController = async (req, res, next) => {
  try {
    const response = await getAllDepartmentService();
    respond.success(res, response);
  } catch (err) {
    //pass error to global Error Handler
    next(err);
  }
};
