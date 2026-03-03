import Appointment from "../../models/Appointment.js";
import User from "../../models/User.js";
import { notifyRealtime } from "../../socket/notify.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { db } from "../db/db.service.js";

export const updateAppointmentService = async (payload, user, appointmentId) => {
  // check appointment id exist or not
  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.ID_NOT_FOUND);
  }

  // fetch  appointment from db
  const appointment = await db.fetchOne(Appointment, { appointmentId });
  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.NOT_FOUND);
  }

  if (payload.status && user.role !== "doctor") {
    throw new ApiError(HTTP_CODES.FORBIDDEN, "Only doctor can update appointment status");
  }

  // Reschedule detection
  if (payload.appointmentDate) {
    const oldDate = new Date(appointment.appointmentDate).setHours(0, 0, 0, 0);
    const newDate = new Date(payload.appointmentDate).setHours(0, 0, 0, 0);

    if (oldDate !== newDate) {
      payload.status = "rescheduled";
    }
  }

  // update appointment
  const isUpdated = await db.updateOne(Appointment, { appointmentId }, payload);

  // if update fail
  if (!isUpdated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, APPOINTMENT_MESSAGES.NOT_UPDATE);
  }

  // notify user when appointment confirmed or rejected by doctor

  //   console.log(payload);
  //   console.log(appointment?.userId);
  if (payload.status === "confirmed" || payload.status === "rejected") {
    const now = new Date();
    const notificationPayload = {
      title: "Appointment Status",
      message:
        payload.status === "confirmed"
          ? "Your appointment has been confirmed by the doctor."
          : "Your appointment has been rejected by the doctor.",
      type: "NEW_APPOINTMENT",
      isRead: false,
      createdAt: now,
    };

    await notifyRealtime(appointment?.userId, notificationPayload);
  }

  // success
  return {
    httpStatus: HTTP_CODES.OK,
    message: APPOINTMENT_MESSAGES.UPDATED,
  };
};
