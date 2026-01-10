import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";
import { db } from "../db/db.service.js";

export const saveSubscriptionService = async (subscriptionData, userInfo) => {
  if (!userInfo) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "access denied");
  }
  if (!subscriptionData) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Subscription data is required");
  }

  if (!subscriptionData?.endpoint || !subscriptionData.keys) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, "Subscription end point  or keys is required");
  }

  const saved = await db.createOneAndUpdate(
    Subscription,
    { endpoint: subscriptionData.endpoint },
    {
      userId: userInfo?.userId,
      endpoint: subscriptionData.endpoint,
      keys: subscriptionData.keys,
      role: userInfo?.role,
    }
  );

  if (!saved) {
    throw new ApiError(HTTP_CODES.INTERNAL_SERVER_ERROR, AUTH_MESSAGES.INTERNAL_SERVER_ERROR);
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "Notification enabled",
  };
};
