import { deleteDepartmentService } from "../../services/department/deleteDepartment.service.js";
import { respond } from "../../utils/respond.js";

export const deleteDepartmentController = async (req, res, next) => {
  try {
    const { departmentId } = req.params;

    const forceDelete = req.query.force === "true";

    console.log(req.params);
    const response = await deleteDepartmentService({ departmentId, forceDelete });
    respond.success(res, response);
  } catch (err) {
    //pass error to global Error Handler
    next(err);
  }
};
