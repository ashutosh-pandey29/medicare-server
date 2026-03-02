import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { NOTIFICATION_MESSAGE } from "../../utils/messages/notification.message.js";
import { db } from "../db/db.service.js";

export const deleteSubscriptionService = async (endpoint) => {
  if (!endpoint) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, NOTIFICATION_MESSAGE.SUBSCRIPTION.ENDPOINT_REQUIRED);
  }

  const deleted = await db.deleteOne(Subscription, { endpoint });
  if (!deleted) {
    throw new ApiError(HTTP_CODES.NOT_FOUND, NOTIFICATION_MESSAGE.SUBSCRIPTION.NOT_FOUND);
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: NOTIFICATION_MESSAGE.SUBSCRIPTION.DISABLED_SUCCESS,
  };
};
