// Import web-push library to send push notifications
import webpush from "web-push";

// Import environment variables (VAPID keys)
import { env } from "./env.js";

/**
 * Configure VAPID details for Web Push
 *
 * VAPID = Voluntary Application Server Identification
 * It is used to identify your server when sending push notifications.
 */

webpush.setVapidDetails(env.VAPID_SUBJECT, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);

// Export configured webpush instance
export default webpush;
