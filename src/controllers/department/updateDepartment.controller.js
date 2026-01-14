import { updateDepartmentService } from "../../services/department/updateDepartment.service.js";
import { respond } from "../../utils/respond.js";

export const updateDepartmentController = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const { departmentName, departmentFees, departmentDescription } = req.body;

    const payload = { departmentId, departmentName, departmentFees, departmentDescription };

    const response = await updateDepartmentService(payload);

    respond.success(res, response);
  } catch (err) {
    //pass error to global Error Handler
    next(err);
  }
};
