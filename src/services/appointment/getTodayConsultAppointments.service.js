import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getTodayConsultAppointmentsService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "user Id not found");
  }
  const doctor = await db.fetchOne(Doctor, { userId: userId });
  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Doctor Not Found");
  }
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const patients = await db.fetchAll(Appointment, {
    $and: [
      { appointmentDate: { $gte: startOfDay, $lte: endOfDay } },
      { status: "confirmed" },
      { isDeleted: false },
      { doctorId: doctor?._id },
    ],
  });

  console.log(startOfDay);
  console.log(endOfDay);
  

  if (!patients) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "patient not found");
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "patient  found",
    data: patients,
  };
};
