import Razorpay from "razorpay";
import Appointment from "../../models/Appointment.js";
import { db } from "../db/db.service.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { env } from "../../config/env.js";

const instance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET,
});

export const createPaymentService = async (appointmentId) => {
  if (!appointmentId) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment ID is required to initiate payment.");
  }

  const appointment = await db.fetchOne(Appointment, { appointmentId: appointmentId });

  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, `No appointment found with ID: ${appointmentId}`);
  }

  const amount = appointment.paymentAmount;

  const options = {
    amount: amount * 100, // amount in paisa
    currency: "INR",
    receipt: `apt_rcpt_${Date.now()}`,
  };

  const order = await instance.orders.create(options);

  if (!order) {
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      "Failed to create payment. Please try again later."
    );
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "payment created successfully. Proceed to payment.",
    data: order,
  };
};
