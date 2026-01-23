import Appointment from "../../models/Appointment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getAppointmentByIdService = async (appointmentId) => {
  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment id not found");
  }

  // fetch appointment by appointment id

  const appointment = await db.fetchOneWithPopulate(
    Appointment,
    { appointmentId, isDeleted: false },
    "",
    [
      { path: "departmentId", select: "departmentName" },
      { path: "doctorId", select: "doctorName" },
    ]
  );

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment not found");
  }
  const preparedAppointmentData = {
    appointmentId: appointment.appointmentId,
    departmentName: appointment.departmentId?.departmentName || null,
    doctorName: appointment.doctorId?.doctorName || null,
    name: appointment.name,
    email: appointment.email,
    phone: appointment.phone,
    token: appointment.token,
    status: appointment.status,
    appointmentDate: appointment.appointmentDate
      ? new Date(appointment.appointmentDate).toDateString()
      : null,
    problem: appointment.problem,
    paymentAmount: appointment.paymentAmount || 0,
    paymentStatus: appointment.paymentStatus || "pending",
  };

  console.log(appointment);

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment fetched",
    data: preparedAppointmentData,
  };
};
