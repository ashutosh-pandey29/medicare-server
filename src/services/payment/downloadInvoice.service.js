import fs from "fs";
import path from "path";
import Appointment from "../../models/Appointment.js";
import Payment from "../../models/Payment.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";
import { generatePdfFromHtml } from "../../helpers/generatePdf.js";
import { PAYMENT_MESSAGE } from "../../utils/messages/payment.message.js";

export const downloadInvoiceService = async (paymentId) => {
  if (!paymentId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, PAYMENT_MESSAGE.PAYMENT_ID_REQUIRED);
  }

  const payment = await db.fetchOne(Payment, { _id: paymentId });
  if (!payment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, `${PAYMENT_MESSAGE.PAYMENT_NOT_FOUND} for - ${paymentId}`);
  }

  if (payment.paymentStatus !== "SUCCESS") {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, PAYMENT_MESSAGE.PAYMENT_NOT_SUCCESS);
  }

  const appointment = await db.fetchOne(Appointment, { _id: payment.appointmentId });
  if (!appointment) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, PAYMENT_MESSAGE.APPOINTMENT_NOT_ASSOCIATED);
  }

  const invoice = {
    invoiceId: payment.transactionId,
    appointmentId: appointment.appointmentId,
    patientName: appointment.name,
    patientPhone: appointment.phone,
    appointmentDate: new Date(appointment.appointmentDate).toLocaleDateString("en-IN"),
    token: appointment.token,
    amount: payment.amount,
    paymentMethod: payment.method.toUpperCase(),
    paymentStatus: payment.paymentStatus,
    paidAt: new Date(payment.createdAt).toLocaleString("en-IN"),
  };

  const htmlPath = path.join(process.cwd(), "src/utils/html/invoice.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  html = html
    .replace(/{{invoiceId}}/g, invoice.invoiceId)
    .replace(/{{appointmentId}}/g, invoice.appointmentId)
    .replace(/{{patientName}}/g, invoice.patientName)
    .replace(/{{patientPhone}}/g, invoice.patientPhone)
    .replace(/{{appointmentDate}}/g, invoice.appointmentDate)
    .replace(/{{token}}/g, invoice.token)
    .replace(/{{amount}}/g, invoice.amount)
    .replace(/{{paymentMethod}}/g, invoice.paymentMethod)
    .replace(/{{paymentStatus}}/g, invoice.paymentStatus.toUpperCase())
    .replace(/{{paidAt}}/g, invoice.paidAt)
    .replace(/{{generatedAt}}/g, new Date().toLocaleString("en-IN"));

  let pdfBuffer;

  try {
    pdfBuffer = await generatePdfFromHtml(html);
  } catch (error) {
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      PAYMENT_MESSAGE.FAILED_TO_GENERATE_INVOICE
    );
  }

  return pdfBuffer;
};
