import nodemailer from "nodemailer";

/**
 * #====================#
 * #  MAIL TRANSPORTER  #
 * #====================#
 */

import { ApiError } from "../../utils/apiError.js";
import { MAIL_MESSAGES } from "../../utils/messages/mail.message.js";
import { env } from "../../config/env.js";

const mailTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: Number(env.MAIL_PORT),
      secure: Number(env.MAIL_PORT) == 465,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
      },
    });

    return transporter;
  } catch (err) {
    // throw err;
    console.log(err);
    throw new ApiError(500, MAIL_MESSAGES.MAIL_TRANSPORTER_FAILED);
  }
};

/**
 * #=========================#
 * #  SENDING MAIL           #
 * #=========================#
 *
 */

export const mailTo = async (receiver, subject, template) => {
  try {
    // calling mail transporter
    const transporter = mailTransporter();
    const mailSendingStatus = await transporter.sendMail({
      from: `${env.MAIL_SENDER_NAME} <${env.MAIL_SENDER_EMAIL}>`,
      to: receiver,
      subject: subject,
      html: template,
    });

    console.log(`Email sent successfully to ${receiver}`);
    return true;
  } catch (err) {
    console.log(err);
    throw new ApiError(500, MAIL_MESSAGES.MAIL_SENDING_FAILED);
  }
};
