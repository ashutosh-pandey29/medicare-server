import Subscription from "../../models/Subscription.js";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { db } from "../db/db.service.js";

export const saveSubscriptionService = async (subscriptionData, userInfo) => {
  if (!userInfo) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      "Unauthorized request. User authentication is required."
    );
  }
  if (!subscriptionData) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      "Subscription data is required to enable notifications."
    );
  }

  if (!subscriptionData?.endpoint || !subscriptionData.keys) {
    throw new ApiError(
      HTTP_CODES.BAD_REQUEST,
      "Subscription endpoint and encryption keys are required."
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
      "Failed to save notification subscription. Please try again."
    );
  }

  return {
    statusCode: HTTP_CODES.OK,
    message: "Push notification subscription enabled successfully.",
  };
};
