import Department from "../../models/Department.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DEPARTMENT_MESSAGE } from "../../utils/messages/department.message.js";
import { db } from "../db/db.service.js";

export const getPublicDepartmentService = async () => {
  const departments = await db.fetchAll(Department, { isDeleted: false }, "_id  departmentName");

  if (!departments || departments.length === 0) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DEPARTMENT_MESSAGE.NOT_FOUND);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DEPARTMENT_MESSAGE.FETCH_ALL_SUCCESS,
    data: departments,
  };
};
