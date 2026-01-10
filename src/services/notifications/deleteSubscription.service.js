import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const deleteSubscriptionService = async (endpoint) => {
  if (!endpoint) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Endpoint is required");
  }

  console.log(endpoint)

  const deleted = await db.deleteOne(Subscription, { endpoint });

  console.log(deleted);
  if (!deleted) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, "Subscription not found");
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "Notification disabled",
  };
};
