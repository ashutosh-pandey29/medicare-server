import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getDoctorByDepartmentIdService = async (departmentId) => {
  if (!departmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Department id is required");
  }

  const doctor = await db.fetchAll(Doctor, { departmentId }, "doctorId  doctorName");
  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "No doctors found for this department.");
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Doctors fetched successfully.",
    data: doctor,
  };
};
