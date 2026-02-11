import { hashPassword } from "../../helpers/password.helper.js";
import User from "../../models/User.js";
import Subscription from "../../models/Subscription.js";
import { db } from "../db/db.service.js";
import { env } from "../../config/env.js";
import { verificationTemplate } from "../email/templates/verification.template.js";
import { mailTo } from "../email/mailTo.service.js";
import { createOneTimeToken } from "../../helpers/token.helper.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { NOTIFICATION_MESSAGE } from "../../utils/messages/notification.message.js";
import { notifyRealtime } from "../../socket/notify.js";
import { pushNotification } from "../webpush/pushNotification.js";

export const registerService = async (data) => {
  // Destructuring values from the incoming request data.
  const { username, email, password, role } = data;

  // check already exist data or not
  const existingUser = await db.exists(User, { email });
  if (existingUser) {
    throw new ApiError(HTTP_CODES.CONFLICT, AUTH_MESSAGES.ALREADY_EXISTS);
  }

  // hashed password - calling pre defined hashPassword() method
  const hashedPassword = await hashPassword(password);

  // generate verification token for verifying email
  const emailVerificationToken = createOneTimeToken();

  // Build the final user data object that will be saved in the database.
  // The password is already hashed and the verificationToken will be used for email verification.
  const formData = {
    username,
    email,
    password: hashedPassword,
    role: role || "user",
    emailVerificationToken,
    emailVerificationTokenExpire: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  let createdUser;
  try {
    // Store the user in the database if they don't already exist
    createdUser = await db.createOne(User, formData);

    // Generate verification URL
    const verificationUrl = `${env.FRONTEND_URL}/auth/verify-email?token=${emailVerificationToken}`;

    // generate verification template
    const verificationEmailTemplate = verificationTemplate(username, verificationUrl);

    //calling mail sender  to send verification link
    await mailTo({
      to: email,
      subject: "Verify Your Account - Medicare Hospital",
      text: verificationEmailTemplate,
    });
  } catch (err) {
    if (createdUser?._id) {
      await db.deleteOne(User, { _id: createdUser._id });
    }

    throw new ApiError({
      statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: AUTH_MESSAGES.REGISTRATION_FAILED,
    });
  }

  // notify admin when new user registered
  const admin = await db.fetchOne(User, { role: "admin" });
  if (admin) {
    const now = new Date();

    // Notification payload for realtime socket
    const notificationPayload = {
      title: NOTIFICATION_MESSAGE.NEW_ACCOUNT,
      message: `${username} registered on ${now.toLocaleString()}`,
      type: "NEW_ACCOUNT",
      isRead: false,
      createdAt: now,
    };

    // Send realtime socket notification
    await notifyRealtime(admin?._id, notificationPayload);

    //Web Push Notification (if admin subscribed)
    const adminSubscription = await db.fetchOne(Subscription, { role: "admin" });

    if (adminSubscription) {
      const pushPayload = {
        title: NOTIFICATION_MESSAGE.NEW_ACCOUNT,
        body: `${username} registered on ${now.toLocaleString()}`,
        url: "dashboard/admin/notifications",
      };

      // send web push
      await pushNotification(
        { endpoint: adminSubscription.endpoint, keys: adminSubscription.keys },
        pushPayload
      );
    }
  }

  // final response
  return {
    statusCode: HTTP_CODES.CREATED,
    message: AUTH_MESSAGES.REGISTRATION_SUCCESS,
  };
};
