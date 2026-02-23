import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import { env } from "../../config/env.js";

// Configure Brevo API
const emailAPI = new TransactionalEmailsApi();
emailAPI.authentications.apiKey.apiKey = env.MAIL_PASSWORD;

// Send email function
export const mailTo = async ({ to, subject, text }) => {
  try {
    const message = new SendSmtpEmail();
    message.sender = { name: env.MAIL_SENDER_NAME, email: env.MAIL_SENDER_EMAIL };
    message.to = [{ email: to, name: "Recipient" }];
    message.subject = subject;
    message.htmlContent = text;

    const response = await emailAPI.sendTransacEmail(message);

    return response;
  } catch (err) {
    throw new Error("Unable to send email at this time. Please try again later.");
  }
};
