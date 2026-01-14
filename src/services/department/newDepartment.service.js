import { generateDepartmentId } from "../../helpers/id.helper.js";
import Department from "../../models/Department.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import {DEPARTMENT_MESSAGE} from "../../utils/messages/department.message.js";
import { db } from "../db/db.service.js";

export const newDepartmentService = async (payload) => {
  const { departmentName, departmentFees, departmentDescription } = payload;

  console.log(payload);

  if (!departmentName || departmentFees === undefined) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, DEPARTMENT_MESSAGE.INVALID_PAYLOAD);
  }

  // generate department unique ID pass department (required)
  const departmentId = generateDepartmentId(departmentName);

  //  Check if department already exists
  const isExists = await db.exists(Department, { departmentName });

  // If exists throw conflict error
  if (isExists) {
    throw new ApiError(HTTP_CODES.CONFLICT, DEPARTMENT_MESSAGE.ALREADY_EXIST);
  }

  //Prepare document data
  const data = { departmentId, departmentName, departmentFees, departmentDescription };

  // If creation fails throw error
  const isCreated = await db.createOne(Department, data);

  if (!isCreated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DEPARTMENT_MESSAGE.CREATE_FAILED);
  }

  // success
  return {
    statusCode: HTTP_CODES.OK,
    message: DEPARTMENT_MESSAGE.CREATED,
  };
};
