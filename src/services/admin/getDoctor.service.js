import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { db } from "../db/db.service.js";

export const getDoctorService = async () => {
  const doctors = await db.fetchManyWithPopulate(
    Doctor,
    {},
    "profileId ,  isVerified , doctorName",
    [{ path: "departmentId", select: "departmentName" }]
  );

  if (!doctors.length) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, DOCTOR_MESSAGE.NOT_FOUND);
  }

  
 const preparedDataTable = doctors.map((doc) => ({
  profileId: doc.profileId,
  doctorName: doc.doctorName,
  isVerified: doc.isVerified,
  departmentName: doc.departmentId?.departmentName,
  _id: doc._id,
}));


  return {
    httpStatus: HTTP_CODES.OK,
    message: "Data fetched",
    data: preparedDataTable,
  };
};
