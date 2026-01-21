import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getUpcomingAppointmentService = async (userId) => {
  // check user id

  if (!userId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "User id not found");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // get upcoming appointment
  const upcomingAppointments = await db.fetchAll(Appointment, {
    userId: userId,
    status: "confirmed",
    isDeleted: false,
    appointmentDate: { $gt: today },
  });

  if (upcomingAppointments.length === 0) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "No Upcoming appointment");
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Upcoming appointment fetched",
    data: upcomingAppointments,
  };
};
