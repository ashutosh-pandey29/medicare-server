import Department from "../../models/Department.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DEPARTMENT_MESSAGE } from "../../utils/messages/department.message.js";
import { db } from "../db/db.service.js";

export const updateDepartmentService = async (payload) => {
  const { departmentId, departmentName, departmentFees, departmentDescription } = payload;

  // check this id exist or not
  const isExists = await db.exists(Department, { departmentId: departmentId });

  //  throw error if  not fund
  if (!isExists) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DEPARTMENT_MESSAGE.NOT_FOUND);
  }

  // if exist then update
  const value = {};
  if (departmentName) value.departmentName = departmentName;
  if (departmentFees) value.departmentFees = departmentFees;
  if (departmentDescription) value.departmentDescription = departmentDescription;

  const filter = { departmentId: departmentId };
  const isUpdated = await db.updateOne(Department, filter, value);

  if (isUpdated.modifiedCount === 0) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DEPARTMENT_MESSAGE.UPDATE_FAILED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DEPARTMENT_MESSAGE.UPDATED,
  };
};
