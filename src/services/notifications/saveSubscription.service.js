import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { NOTIFICATION_MESSAGE } from "../../utils/messages/notification.message.js";
import { db } from "../db/db.service.js";

export const saveSubscriptionService = async (subscriptionData, userInfo) => {
  if (!userInfo) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, NOTIFICATION_MESSAGE.SUBSCRIPTION.UNAUTHORIZED);
  }
  if (!subscriptionData) {
    throw new ApiError(HTTP_CODES.BAD_REQUEST, NOTIFICATION_MESSAGE.SUBSCRIPTION.DATA_REQUIRED);
  }

  if (!subscriptionData?.endpoint || !subscriptionData.keys) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      NOTIFICATION_MESSAGE.SUBSCRIPTION.ENDPOINT_KEYS_REQUIRED
    );
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
    throw new ApiError(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      NOTIFICATION_MESSAGE.SUBSCRIPTION.SAVE_FAILED
    );
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: NOTIFICATION_MESSAGE.SUBSCRIPTION.ENABLED_SUCCESS,
  };
};
