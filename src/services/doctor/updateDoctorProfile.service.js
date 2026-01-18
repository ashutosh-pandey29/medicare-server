import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const updateDoctorProfileService = async (data, userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "user id not found");
  }

  // find user

  const isExists = await db.exists(Doctor, { userId });

  if (!isExists) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.PROFILE_NOT_FOUND);
  }

  // update data

  const isUpdated = await db.updateOne(Doctor, { userId }, data, { new: true });

  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DOCTOR_MESSAGE.PROFILE_NOT_UPDATED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.PROFILE_UPDATED,
  };
};
