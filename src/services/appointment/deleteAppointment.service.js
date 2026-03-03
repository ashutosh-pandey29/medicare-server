import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { db } from "../db/db.service.js";

export const deleteAppointmentService = async (appointmentId) => {
  // check appointment id provided or not

  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, APPOINTMENT_MESSAGES.ID_NOT_FOUND);
  }

  const appointment = await db.fetchOne(Appointment, { appointmentId, isDeleted: { $ne: true } });

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.NOT_FOUND);
  }

  const isDeleted = await db.updateOne(Appointment, { appointmentId }, { isDeleted: true });

  if (!isDeleted) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, APPOINTMENT_MESSAGES.NOT_DELETE);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message:APPOINTMENT_MESSAGES.DELETE,
  };
};
