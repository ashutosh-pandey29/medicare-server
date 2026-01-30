import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const appointmentStatsService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "User id not found");
  }

  const appointments = await db.fetchAll(Appointment, { userId: userId, isDeleted: false });

  const total = appointments.length;
  let confirmed = 0;
  let cancelled = 0;
  let completed = 0;

  appointments.forEach((apt) => {
    if (apt.status === "confirmed") confirmed++;
    if (apt.status === "cancelled") cancelled++;
    if (apt.status === "completed") completed++;
  });

  const stats = {
    total,
    upcoming: confirmed,
    cancelled,
    completed,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment Stats fetched",
    data: stats,
  };
};
