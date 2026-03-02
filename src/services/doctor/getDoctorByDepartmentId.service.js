import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const getDoctorByDepartmentIdService = async (departmentId) => {
  if (!departmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.DEPARTMENT_ID_REQ);
  }

  const doctor = await db.fetchAll(Doctor, { departmentId }, "doctorId  doctorName");
  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.NOT_FOUND);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.DATA_FETCH,
    data: doctor,
  };
};
