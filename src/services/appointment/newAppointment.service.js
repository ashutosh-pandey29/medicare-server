import { generateId } from "../../helpers/id.helper.js";
import Appointment from "../../models/Appointment.js";
import Department from "../../models/Department.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const newAppointmentService = async (payload, userId) => {
  //!<-------Destructure appointment details ----------->
  const { name, phone, email, appointmentDate, problem, doctorId, departmentId } = payload;

  //!<-- Convert incoming date string to Date object and normalize time to 00:00:00 (midnight) so that only the date is stored and date-wise comparisons & queries remain consistent---->
  let today = new Date(appointmentDate);
  today.setHours(0, 0, 0, 0);

  //!<-------------------  department -> for getting fees ---------->
  const department = await db.fetchOne(Department, { _id: departmentId });
  if (!department) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Department not found");
  }

  //!<--------------- generate Appointment id --------------------->
  const appointmentId = generateId("APT");

  //!<----------- generate token number (department + date wise) ------------------>
  const count = await db.countDocument(Appointment, {
    doctorId,
    departmentId,
    appointmentDate: today,
  });
  const tokenNumber = count + 1;

  //!<----------------- Prepare appointment object ------------->
  const newAppointment = {
    appointmentId,
    name,
    phone,
    email,
    appointmentDate: today,
    problem,
    token: tokenNumber,
    doctorId,
    departmentId,
    userId,
    paymentAmount: department.departmentFees,
  };

  //!<----------- create new appointment save to db --------------->

  const isCreated = await db.createOne(Appointment, newAppointment);
  //? <-----------If creation failed, throw error------------>
  if (!isCreated) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, "Appointment not created");
  }

  //!<---------Success response----------->
  const data = { appointmentId, paymentAmount: department.departmentFees, token: tokenNumber };

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Appointment booked proceed to payment",
    data: data,
  };
};
