import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { APPOINTMENT_MESSAGES } from "../../utils/messages/appointment.message.js";
import { SERVER_MESSAGES } from "../../utils/messages/server.message.js";
import { db } from "../db/db.service.js";

export const getAllPatientByDoctorService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, APPOINTMENT_MESSAGES.ID_NOT_FOUND);
  }

  // fetch appointment by user id

  const doctor = await db.fetchOne(Doctor, { userId });

  if (!doctor) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  const pipeline = [
    {
      $match: {
        doctorId: doctor?._id,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$name",
        visitCount: { $sum: 1 },
        lastVisit: { $max: "$appointmentDate" },
        lastStatus: { $last: "$status" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        visitCount: 1,
        lastVisit: 1,
        status: "$lastStatus",
      },
    },
  ];

  //  const patients = await db.fetchAll(Appointment, {
  //     doctorId: doctor?._id,
  //     isDeleted: false,
  //   });

  const patients = await db.aggregate(Appointment, pipeline);

  if (!patients) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, APPOINTMENT_MESSAGES.PATIENT_NOT_FOUND);
  }

  // const preparedAppointmentData = patients.map((appointment) => ({
  //   name: appointment.name,
  //   status: appointment.status,
  // }));

  return {
    httpStatus: HTTP_CODES.OK,
    message: APPOINTMENT_MESSAGES.FETCH_SUCCESS,
    data: patients,
  };
};
