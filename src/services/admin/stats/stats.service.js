import Doctor from "../../../models/Doctor.js";
import Appointment from "../../../models/Appointment.js";
import Payment from "../../../models/Payment.js";
import { db } from "../../db/db.service.js";
import { HTTP_CODES } from "../../../utils/httpCodes.js";

export const statsService = async () => {
  const totalDoctor = await db.countDocument(Doctor, {
    isDeleted: false,
  });

  const totalAppointment = await db.countDocument(Appointment, {
    isDeleted: false,
  });

  const payments = await db.fetchAll(Payment, {
    paymentStatus: "success",
  });

  console.log(payments);
  let totalRevenue = 0;
  payments.forEach((p) => {
    totalRevenue += p.amount;
  });

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Stats fetched successfully",
    data: {
      totalDoctor,
      totalAppointment,
      totalRevenue,
    },
  };
};
