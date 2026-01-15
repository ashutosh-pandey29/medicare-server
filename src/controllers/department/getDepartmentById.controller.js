import { getDepartmentByIdService } from "../../services/department/getDepartmentById.service.js";
import { respond } from "../../utils/respond.js";

export const getDepartmentByIdController = async (req ,  res ,  next) => {
  try {
    
    const { departmentId } = req.params;

    const response = await getDepartmentByIdService(departmentId);

    respond.success(res, response);

  } catch (err) {
    // pass error to global error handler 
    next(err)
  }
}