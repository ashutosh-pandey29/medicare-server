import { newDepartmentService } from "../../services/department/newDepartment.service.js";
import { respond } from "../../utils/respond.js";

export const newDepartmentController = async (req, res, next) => {
  try {
    const response = await newDepartmentService(req.body);
    respond.success(res, response);
  } catch (err) {
    //pass error to global Error Handler
    next(err);
  }
};
