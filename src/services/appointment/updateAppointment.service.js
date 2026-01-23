import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const updateAppointmentService = async (payload, user, appointmentId) => {
  // check appointment id exist or not
  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment id invalid or not found");
  }

  // fetch  appointment from db
  const appointment = await db.fetchOne(Appointment, { appointmentId });
  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment not found");
  }

  // check role (user not allowed to change status)
  if (user.role === "user") {
    throw new ApiError(HTTP_CODES.FORBIDDEN, "You have no permission to perform this action");
  }

  // if booking date change (status reschedule)
  const oldDate = new Date(appointment.appointmentDate).setHours(0, 0, 0, 0);
  const newDate = new Date(payload.appointmentDate).setHours(0, 0, 0, 0);
  if (oldDate !== newDate) {
    payload.status = "rescheduled";
  }

  // update appointment
  const isUpdated = await db.updateOne(Appointment, { appointmentId }, payload);

  // if update fail
  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Appointment can not updated");
  }

  // success
  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment updated successfully",
  };
};
