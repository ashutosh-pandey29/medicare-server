import Razorpay from "razorpay";
import Appointment from "../../models/Appointment.js";
import { db } from "../db/db.service.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { env } from "../../config/env.js";
import { PAYMENT_MESSAGE } from "../../utils/messages/payment.message.js";

const instance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET,
});

export const createPaymentService = async (appointmentId) => {
  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, PAYMENT_MESSAGE.APPOINTMENT_ID_REQUIRED);
  }

  const appointment = await db.fetchOne(Appointment, { appointmentId: appointmentId });

  if (!appointment) {
    throw new ApiError(
      HTTP_CODES.NOT_FOUND,
      `${PAYMENT_MESSAGE.APPOINTMENT_NOT_FOUND} - ${appointmentId}`
    );
  }

  const amount = appointment.paymentAmount;

  const options = {
    amount: amount * 100, // amount in paisa
    currency: "INR",
    receipt: `apt_rcpt_${Date.now()}`,
  };

  const order = await instance.orders.create(options);

  if (!order) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, PAYMENT_MESSAGE.PAYMENT_CREATION_FAILED);
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: PAYMENT_MESSAGE.PAYMENT_CREATED_SUCCESS,
    data: order,
  };
};
