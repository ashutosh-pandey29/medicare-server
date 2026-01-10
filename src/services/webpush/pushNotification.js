import webpush from "../../config/webpush.config.js";

export const pushNotification = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (err) {
    console.log("Push notification failed for admin:", err);
  }
};
