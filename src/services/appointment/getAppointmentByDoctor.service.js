import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { SERVER_MESSAGES } from "../../utils/messages/server.message.js";
import { db } from "../db/db.service.js";

export const getAppointmentByDoctorService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, APPOINTMENT_MESSAGES.ID_NOT_FOUND);
  }

  // fetch appointment by user id

  const doctor = await db.fetchOne(Doctor, { userId });

  if (!doctor) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  const appointments = await db.fetchAll(Appointment, {
    doctorId: doctor?._id,
    isDeleted: false,
    status: "booked",
  });

  if (!appointments) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.NOT_FOUND);
  }

  const preparedAppointmentData = appointments.map((appointment) => ({
    appointmentId: appointment.appointmentId,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone,
    token: appointment.token,
    status: appointment.status,
    appointmentDate: new Date(appointment.appointmentDate).toDateString(),
    problem: appointment.problem,
    paymentAmount: appointment.paymentAmount,
    paymentStatus: appointment.paymentStatus,
  }));

  return {
    httpStatus: HTTP_CODES.OK,
    message: APPOINTMENT_MESSAGES.FETCH_SUCCESS,
    data: preparedAppointmentData,
  };
};
