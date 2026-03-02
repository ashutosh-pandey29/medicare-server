import Appointment from "../../models/Appointment.js";
import Payment from "../../models/Payment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { PAYMENT_MESSAGE } from "../../utils/messages/payment.message.js";
import { db } from "../db/db.service.js";

export const getPaymentService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, PAYMENT_MESSAGE.USER_ID_REQUIRED);
  }

  let payments = await db.fetchAll(
    Payment,
    { userId },
    "amount paymentStatus method transactionId createdAt appointmentId"
  );

  if (!payments || payments.length === 0) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, PAYMENT_MESSAGE.USER_PAYMENT_NOT_FOUND);
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
            doctorName: appointment.doctorId?.doctorName || null,
            departmentName: appointment.departmentId?.departmentName || null,
          }
        : null,
    };
  });

  return {
    httpStatus: HTTP_CODES.OK,
    message: PAYMENT_MESSAGE.USER_HISTORY_FETCH_SUCCESS,
    data: data,
  };
};
