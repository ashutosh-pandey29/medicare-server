import Doctor from "../../models/Doctor.js";
import User from "../../models/User.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const rollbackDoctorService = async (userId) => {
  if (!userId) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "User ID is required to rollback doctor role.");
  }

  const doctor = await db.fetchOne(Doctor, { _id: userId });

  if (!doctor) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Doctor profile not found for this user.");
  }

  const isRoleUpdated = await db.updateOne(User, { _id: doctor.userId }, { role: "user" });

  if (!isRoleUpdated) {
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      "Failed to rollback doctor role. Please try again."
    );
  }

  // delete doctor profile

  const isProfileDeleted = await db.updateOne(Doctor, { _id: userId }, { isDeleted: true });

  if (!isProfileDeleted) {
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      "Role reverted but failed to deactivate doctor profile."
    );
  }

  return {
    httpStatus: HTTP_CODES.OK,
    message: "Doctor role rolled back and profile deactivated successfully.",
    data: null,
  };
};
