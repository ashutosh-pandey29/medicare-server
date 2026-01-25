import { env } from "../../config/env.js";
import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import Payment from "../../models/Payment.js";
import { notifyRealtime } from "../../socket/notify.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";
import crypto from "crypto";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET,
});

export const verifyPaymentService = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  appointmentId,
  user
) => {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign)
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    // make  payment record - insert payment info in payment model /db
    // update appointment model and add payment  info
    const filter = { appointmentId: appointmentId };
    const data = { $set: { status: "booked", paymentStatus: "success", paymentMethod: "online" } };

    const isUpdated = await db.updateOne(Appointment, filter, data);
    if (!isUpdated) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, "appointment status not updated");
    }
    const payment = await instance.payments.fetch(razorpay_payment_id);
    const paymentMethod = payment.method;

    const appointment = await db.fetchOne(Appointment, { appointmentId });

    if (!appointment) {
      throw new ApiError(HTTP_CODES.NOT_FOUND, "Appointment not found");
    }

    const paymentData = {
      userId: user?.userId || null,
      appointmentId: appointment._id,
      userName: user?.username || null,
      userPhone: appointment.phone,
      transactionId: razorpay_payment_id,
      amount: appointment.paymentAmount,
      paymentStatus: "success",
      method: paymentMethod,
      gatewayResponse: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    };

    const isPaymentInserted = await db.createOne(Payment, paymentData);

    if (!isPaymentInserted) {
      throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Payment failed");
    }

    console.log(appointment);

    // send realtime notification

    const doctor = await db.fetchOne(Doctor, { doctorId: appointmentId?.doctorId });
    const now = new Date();
    const notificationPayload = {
      title: "New Appointment",
      message: `A new appointment request has been received. Please review and approve.`,
      type: "NEW_APPOINTMENT",
      isRead: false,
      createdAt: now,
    };

    await notifyRealtime(doctor?.userId, notificationPayload);

    return {
      httpStatus: HTTP_CODES.OK,
      message: "Payment success",
      data: null,
    };
  } else {
    console.log("Invalid signature");
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Payment failed");
  }
};
