import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getAllAppointmentService = async () => {
  // fetch appointment by appointment id

  const appointment = await db.fetchManyWithPopulate(Appointment, { isDeleted: false }, "", [
    { path: "departmentId", select: "departmentName" },
    { path: "doctorId", select: "doctorName" },
  ]);

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment not found");
  }

  const preparedAppointmentData = {
    appointmentId: appointment.appointmentId,
    departmentName: appointment.departmentId.departmentName,
    doctorName: appointment.doctorId.doctorName,
    name: appointment.name,
    token: appointment.token,
    status: appointment.status,
    appointmentDate: new Date(appointment.appointmentDate).toDateString(),
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment fetched",
    data: preparedAppointmentData,
  };
};
