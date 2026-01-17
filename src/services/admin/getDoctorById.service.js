import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const getDoctorByIdService = async (profileId) => {
  const doctors = await db.fetchOneWithPopulate(Doctor, { profileId: profileId }, "", [
    { path: "departmentId", select: "departmentName" },
    { path: "userId", select: "username  email" },
  ]);

  if (!doctors) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.NOT_FOUND);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Data fetched",
    data: doctors,
  };
};
