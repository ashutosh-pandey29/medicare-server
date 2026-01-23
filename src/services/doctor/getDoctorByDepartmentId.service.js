import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getDoctorByDepartmentIdService = async (departmentId) => {
  if (!departmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "department id not found");
  }

  console.log(departmentId);

  const doctor = await db.fetchAll(Doctor, {departmentId}, "doctorId  doctorName");

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "doctor not found");
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Doctor fetched",
    data: doctor,
  };
};
