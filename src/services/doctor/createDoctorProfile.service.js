import { generateKey } from "crypto";
import Doctor from "../../models/Doctor.js";
import User from "../../models/User.js";
import { notifyRealtime } from "../../socket/notify.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { DOCTOR_MESSAGE } from "../../utils/messages/doctor.message.js";
import { NOTIFICATION_MESSAGE } from "../../utils/messages/notification.message.js";
import { db } from "../db/db.service.js";
import { generateId } from "../../helpers/id.helper.js";

export const createDoctorProfileService = async (payload, userId) => {
  //  Validate required userId
  if (!userId) {
    throw new ApiError(HTTP_CODES.FORBIDDEN, DOCTOR_MESSAGE.FORBIDDEN);
  }

  const isExist = await db.exists(Doctor, { userId });

  if (isExist) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, DOCTOR_MESSAGE.PROFILE_ALREADY_EXISTS);
  }

  const preparedProfile = {
    profileId: generateId(payload.doctorName ? `D${payload.doctorName}` : "DOC"),
    userId: userId,
    doctorName: payload.doctorName,
    phone: payload.phone,
    gender: payload.gender,
    departmentId: payload.departmentId,
    education: payload.education,
    experience: payload.experience,
    bio: payload.bio || "Not updated yet",
    workingTime: payload.workingTime,
  };

  // calling db

  const isCreated = await db.createOne(Doctor, preparedProfile);

  if (!isCreated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, DOCTOR_MESSAGE.PROFILE_NOT_CREATED);
  }

  // notify admin and send a message to approve doctor profile -  real time
  const admin = await db.fetchOne(User, { role: "admin" });
  if (admin) {
    const now = new Date();
    const notificationPayload = {
      title: NOTIFICATION_MESSAGE.PROFILE_VERIFICATION_REQUEST,
      message: `${
        payload?.doctorName || "A user"
      } has created a doctor profile and requested verification on ${now.toLocaleString()}`,
      type: "NEW_ACCOUNT",
      isRead: false,
      createdAt: now,
    };
    await notifyRealtime(admin?._id, notificationPayload);
  }

  // web push notification later

  return {
    httpStatus: HTTP_CODES.OK,
    message: DOCTOR_MESSAGE.PROFILE_CREATED,
  };
};
