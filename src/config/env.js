import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  // Database
  MONGO_URI: isProd
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV,

  // JWT
  JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,

  // Frontend URL
  FRONTEND_URL: isProd
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_DEV,

  // Mail
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_SECURE: process.env.MAIL_SECURE,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_SENDER_NAME: process.env.MAIL_SENDER_NAME,
  MAIL_SENDER_EMAIL: process.env.MAIL_SENDER_EMAIL,

  // Payment (Razorpay)
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,

  // Google Auth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // Web Push Notifications
  VAPID_SUBJECT: process.env.VAPID_SUBJECT,
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
};
