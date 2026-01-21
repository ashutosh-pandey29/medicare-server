import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const deleteAppointmentService = async (appointmentId) => {
  // check appointment id provided or not

  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment Id not found");
  }

  const appointment = await db.fetchOne(Appointment, { appointmentId, isDeleted: { $ne: true } });

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment not found");
  }

  const isDeleted = await db.updateOne(Appointment, { appointmentId }, { isDeleted: true });

  if (!isDeleted) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Appointment not delete");
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment deleted successfully",
  };
};
