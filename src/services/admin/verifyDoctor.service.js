import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const verifyDoctorProfileService = async (profileId) => {
  // Check doctor exists
  const doctor = await db.fetchOne(Doctor, { profileId });

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.NOT_FOUND);
  }

  //  Already verified check
  if (doctor.isVerified) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "already verified");
  }

  //  Verify doctor
  const updatedDoctor = await db.updateOne(Doctor, { profileId }, { isVerified: true });

  if (!updatedDoctor) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DOCTOR_MESSAGE.VERIFY_FAILED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.VERIFIED_SUCCESS,
    data: { profileId },
  };
};
