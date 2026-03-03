import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { db } from "../db/db.service.js";

export const getAppointmentByPatientService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, APPOINTMENT_MESSAGES.ID_NOT_FOUND);
  }

  // fetch appointment by user id

  const appointment = await db.fetchOneWithPopulate(Appointment, { userId, isDeleted: false }, "", [
    { path: "departmentId", select: "departmentName" },
    { path: "doctorId", select: "doctorName" },
  ]);

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.NOT_FOUND);
  }

  const preparedAppointmentData = {
    appointmentId: appointment.appointmentId,
    departmentName: appointment.departmentId.departmentName,
    doctorName: appointment.doctorId.doctorName,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone,
    token: appointment.token,
    status: appointment.status,
    appointmentDate: new Date(appointment.appointmentDate).toDateString(),
    problem: appointment.problem,
    paymentAmount: appointment.paymentAmount,
    paymentStatus: appointment.paymentStatus,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: APPOINTMENT_MESSAGES.FETCH_SUCCESS,
    data: preparedAppointmentData,
  };
};
