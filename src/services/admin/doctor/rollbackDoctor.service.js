import Doctor from "../../../models/Doctor.js";
import User from "../../../models/User.js";
import { ApiError } from "../../../utils/apiError.js";
import { HTTP_CODES } from "../../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../../utils/messages/doctor.message.js";
import { db } from "../../db/db.service.js";

export const rollbackDoctorService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, DOCTOR_MESSAGE.MISSING_USER_ID);
  }

  const doctor = await db.fetchOne(Doctor, { _id: userId });

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.PROFILE_NOT_FOUND);
  }

  const isRoleUpdated = await db.updateOne(User, { _id: doctor.userId }, { role: "user" });

  if (!isRoleUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DOCTOR_MESSAGE.ROLE_ROLLBACK_FAILED);
  }

  // delete doctor profile

  const isProfileDeleted = await db.updateOne(Doctor, { _id: userId }, { isDeleted: true });

  if (!isProfileDeleted) {
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      DOCTOR_MESSAGE.PROFILE_DEACTIVATION_FAILED
    );
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.ROLLBACK_SUCCESS,
    data: null,
  };
};
