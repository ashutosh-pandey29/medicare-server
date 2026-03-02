import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//? Import environment variables
import { env } from "./config/env.js";

//? Initialize passport configuration (executes immediately)
import "./config/passport.js";

//? Create an instance of the Express application
//? This 'app' will be used to define routes, middlewares, and server configuration
const app = express();

//? importing app  routes and services
import routes from "./routes/index.routes.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { cronScheduler } from "./cron/cronScheduler.js";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.js";

/**
 * ==============================
 * !MIDDLEWARE
 * ==============================
 */

//? Enable CORS (Cross-Origin Resource Sharing)
//? Allows frontend domain to access backend APIs
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//? PARSE JSON PAYLOAD -  request with JSON data
app.use(express.json());

//?Parse URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

//? Middleware to parse cookies from incoming requests
app.use(cookieParser());




/**
 * ======================================
 * !Registering All API Routes
 * ======================================
 * All application routes are mounted under /api/v1
 */
 
/**
 * ======================================
 * !Global Rate Limiter Middleware
 * ======================================
 * • Applies to all routes under /api/v1
 * • Limits each IP to 100 requests per minute
 * • Helps prevent abuse, spam, and brute-force attacks
 */
app.use("/api/v1", rateLimiter , routes);

/**
 * ===============================
 * ! REDIRECT FRONTEND
 * ===============================
 */

/**
 * ================================
 * ! CRON SCHEDULAR - START
 * ================================
 */
//? Initialize background cron jobs when app starts
cronScheduler();

/**
 * ============================
 * !GLOBAL ERROR HANDLER
 * ============================
 */
//? Catches all errors thrown in routes/middlewares
app.use(globalErrorHandler);

//? Export app to be used in server.js
export default app;
