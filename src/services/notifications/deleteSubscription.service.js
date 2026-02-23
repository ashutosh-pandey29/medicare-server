import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const deleteSubscriptionService = async (endpoint) => {
  if (!endpoint) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      "Subscription endpoint is required to disable notifications."
    );
  }

  const deleted = await db.deleteOne(Subscription, { endpoint });
  if (!deleted) {
    throw new ApiError(
      HTTP_CODES.NOT_FOUND,
      "No active subscription found for the provided endpoint."
    );
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "Push notification subscription disabled successfully.",
  };
};
