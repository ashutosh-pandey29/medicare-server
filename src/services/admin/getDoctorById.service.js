import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const getDoctorByIdService = async (profileId) => {
  const doctor = await db.fetchOneWithPopulate(Doctor, { profileId: profileId }, "", [
    { path: "departmentId", select: "departmentName" },
    { path: "userId", select: "username  email" },
  ]);

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.NOT_FOUND);
  }

  const preparedDoctorProfileResponse = {
    profileId: doctor.profileId,
    doctorName: doctor.doctorName,
    phone: doctor.phone,
    gender: doctor.gender,
    department: doctor.departmentId ? doctor.departmentId.departmentName : null,
    experience: doctor.experience,
    bio: doctor.bio,
    isVerified: doctor.isVerified,
    education: doctor.education,
    isIdCardIssued: doctor.isIdCardIssued,
    workingTime: doctor.workingTime,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Data fetched",
    data: preparedDoctorProfileResponse,
  };
};
