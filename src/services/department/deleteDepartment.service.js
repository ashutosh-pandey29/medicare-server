import Department from "../../models/Department.js";
import Doctor from "../../models/Doctor.js";
import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DEPARTMENT_MESSAGE } from "../../utils/messages/department.message.js";
import { db } from "../db/db.service.js";

export const deleteDepartmentService = async (payload) => {
  const { departmentId, forceDelete } = payload;

  if (!departmentId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, DEPARTMENT_MESSAGE.ID_REQUIRED);
  }

  // fetch department data
  const department = await db.fetchOne(Department, { departmentId });

  // Department not found or already deleted
  if (!department || department.isDeleted) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DEPARTMENT_MESSAGE.NOT_FOUND);
  }

  // Check if any doctor or appointment is linked
  const isDoctorExist = await db.exists(Doctor, { departmentId: department._id });
  const isAppointmentExist = await db.exists(Appointment, { departmentId: department._id });

  // No dependency ( HARD DELETE)
  if (!isDoctorExist && !isAppointmentExist) {
    const isHardDeleted = await db.deleteOne(Department, { departmentId });

    if (!isHardDeleted) {
      throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DEPARTMENT_MESSAGE.DELETE_FAILED);
    }

    return {
      httpStatus: HTTP_CODES.OK,
      message: DEPARTMENT_MESSAGE.DELETED,
    };
  }

  // Block deletion if linked data exists and force delete not used
  if ((isDoctorExist || isAppointmentExist) && !forceDelete) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, DEPARTMENT_MESSAGE.DELETE_BLOCKED);
  }

  // Force delete + dependency exist => Soft delete only (data persistence)
  const isDeleted = await db.updateOne(
    Department,
    { departmentId },
    { isDeleted: true, deletedAt: new Date() }
  );

  if (!isDeleted) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DEPARTMENT_MESSAGE.DELETE_FAILED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DEPARTMENT_MESSAGE.FORCE_DELETED,
  };
};
