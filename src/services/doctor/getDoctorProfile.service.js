import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const getDoctorProfileService = async (userId) => {
  // check  userid

  if (!userId) {
    throw new ApiError(HTTP_CODES.FORBIDDEN, DOCTOR_MESSAGE.FORBIDDEN);
  }

  // const doctor = await db.fetchOne(Doctor, { userId });

  const doctor = await db.fetchOneWithPopulate(Doctor, { userId }, "", [
    { path: "departmentId", select: "departmentName" },
  ]);

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.PROFILE_NOT_FOUND);
  }

  // prepare doctor profile

  const preparedProfileResponse = {
    profileId: doctor.profileId,
    doctorName: doctor.doctorName,
    phone: doctor.phone,
    gender: doctor.gender,
    department: doctor.departmentId ? doctor.departmentId.departmentName : null,
    experience: doctor.experience,
    bio: doctor.bio,
    education: doctor.education,
    workingTime: doctor.workingTime,
    isVerified:doctor.isVerified,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.PROFILE_FETCHED,
    data: preparedProfileResponse,
  };
};
