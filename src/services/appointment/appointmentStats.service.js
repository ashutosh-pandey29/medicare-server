import Appointment from "../../models/Appointment.js";
import Doctor from "../../models/Doctor.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const appointmentStatsService = async (user) => {
  if (!user) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "User not found");
  }
  let filter = { isDeleted: false };

  if (user.role === "doctor") {
    const doctor = await db.fetchOne(Doctor, { userId: user.userId });
    filter.doctorId = doctor?._id;
  } else if (user.role === "user") {
    filter.userId = user.userId;
  }

  const appointments = await db.fetchAll(Appointment, filter);

  const total = appointments.length;
  let confirmed = 0;
  let cancelled = 0;
  let completed = 0;

  appointments.forEach((apt) => {
    if (apt.status === "confirmed") confirmed++;
    if (apt.status === "cancelled") cancelled++;
    if (apt.status === "completed") completed++;
  });

  // stats for doctor
  let doctorStats = {};

  if (user.role === "doctor") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(start.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const todayAppointments = appointments.filter(
      (apt) => new Date(apt.appointmentDate) >= start && new Date(apt.appointmentDate) <= end
    );

    const todayCompleted = todayAppointments.filter((apt) => apt.status === "completed");

    const weeklyAppointments = appointments.filter(
      (apt) => new Date(apt.appointmentDate) >= weekStart
    );

    const weeklyCompleted = weeklyAppointments.filter((apt) => apt.status === "completed");

    doctorStats = {
      todayTotal: todayAppointments.length,
      todayCompleted: todayCompleted.length,
      weeklyTotal: weeklyAppointments.length,
      weeklyCompleted: weeklyCompleted.length,
    };
  }

  // stats for admin

  let adminStats = {};
  if (user.role === "admin") {
    const allAppointments = await db.fetchAll(Appointment, { isDeleted: false });
    adminStats = {
      totalAppointments: allAppointments.length,
      confirmed: allAppointments.filter((a) => a.status === "confirmed").length,
      cancelled: allAppointments.filter((a) => a.status === "cancelled").length,
      completed: allAppointments.filter((a) => a.status === "completed").length,
    };
  }

  const stats = {
    total,
    upcoming: confirmed,
    cancelled,
    completed,
    ...doctorStats,
    ...adminStats,
  };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment Stats fetched",
    data: stats,
  };
};
