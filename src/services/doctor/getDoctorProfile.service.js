import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getDoctorProfileService = async (userId) => {
  // check  userid

  if (!userId) {
    throw new ApiError(HTTP_CODES.FORBIDDEN, "You are not authorized to access this profile.");
  }

  // const doctor = await db.fetchOne(Doctor, { userId });

  const doctor = await db.fetchOneWithPopulate(Doctor, { userId }, "", [
    { path: "departmentId", select: "departmentName" },
  ]);

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Doctor profile not found.");
  }

  // prepare doctor profile

  const preparedProfileResponse = {
    profileId: doctor.profileId,
    doctorName: doctor.doctorName,
    phone: doctor.phone,
    gender: doctor.gender,
    departmentId: doctor.departmentId._id,
    department: doctor.departmentId ? doctor.departmentId.departmentName : null,
    experience: doctor.experience,
    bio: doctor.bio,
    education: doctor.education,
    workingTime: doctor.workingTime,
    isVerified: doctor.isVerified,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Doctor profile fetched successfully.",
    data: preparedProfileResponse,
  };
};
