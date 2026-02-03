import Appointment from "../../models/Appointment.js";
import Payment from "../../models/Payment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const getAllPaymentService = async () => {
  let payments = await db.fetchAll(
    Payment,
    {},
    "amount paymentStatus method transactionId createdAt   appointmentId"
  );

  if (!payments) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Payment Not Found");
  }

  const appointmentIds = payments.map((pay) => pay.appointmentId);

  const appointmentDetails = await db.fetchManyWithPopulate(
    Appointment,
    { _id: { $in: appointmentIds } },
    "",
    [
      { path: "departmentId", select: "departmentName" },
      { path: "doctorId", select: "doctorName" },
    ]
  );

  const data = payments.map((p) => {
    const appointment = appointmentDetails.find(
      (apt) => apt._id.toString() === p.appointmentId.toString()
    );

    return {
      paymentId: p._id,
      paymentAmount: p.amount,
      paymentMethod: p.method,
      paymentStatus: p.paymentStatus,
      transactionId: p.transactionId,
      paidAt: p.createdAt,
      appointment: appointment
        ? {
            patientName : appointment.name,
            doctorName: appointment.doctorId?.doctorName || null,
            departmentName: appointment.departmentId?.departmentName || null,
          }
        : null,
    };
  });

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Payment fetched",
    data: data,
  };
};
