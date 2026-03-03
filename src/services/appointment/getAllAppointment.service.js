import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { db } from "../db/db.service.js";

export const getAllAppointmentService = async (userId) => {
  // fetch appointment by appointment id

  const appointment = await db.fetchManyWithPopulate(
    Appointment,
    { userId },
    { isDeleted: false },
    "",
    [
      { path: "departmentId", select: "departmentName" },
      { path: "doctorId", select: "doctorName" },
    ]
  );

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.NOT_FOUND);
  }

  console.log(appointment);

  const preparedAppointmentData = appointment.map((apt) => ({
    appointmentId: apt.appointmentId,
    departmentName: apt.departmentId?.departmentName || null,
    doctorName: apt.doctorId?.doctorName || null,
    name: apt.name,
    token: apt.token,
    status: apt.status,
    appointmentDate: apt.appointmentDate ? new Date(apt.appointmentDate).toDateString() : null,
  }));

  return {
    httpStatus: HTTP_CODES.OK,
    message: APPOINTMENT_MESSAGES.FETCH_SUCCESS,
    data: preparedAppointmentData,
  };
};
