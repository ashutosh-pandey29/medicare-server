import Payment from "../../../models/Payment.js";
import { ApiError } from "../../../utils/apiError.js";
import { HTTP_CODES } from "../../../utils/httpCodes.js";
import { db } from "../../db/db.service.js";
import Appointment from "../../../models/Appointment.js";

export const getPaymentGraphService = async () => {
  const pipeline = [
    {
      $match: {
        paymentStatus: "success",
      },
    },
    {
      $group: {
        _id: { $year: "$createdAt" },
        revenue: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        revenue: 1,
      },
    },
  ];
  const data = await db.aggregate(Payment, pipeline);

  if (!data) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Revenue not found");
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "data fetched",
    data,
  };
};

export const getPatientGraphService = async () => {
  const pipeline = [
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
        },
        total: { $sum: 1 }, // count patients
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        total: 1,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ];

  const data = await db.aggregate(Appointment, pipeline);

  if (!data) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Revenue not found");
  }
  return {
    httpStatus: 200,
    message: "Patient analytics fetched successfully",
    data,
  };
};
