import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

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
import { maintenanceMode } from "./middlewares/maintenanceMode.middleware.js";
import { optionalAuth } from "./middlewares/optionalAuth.middleware.js";

/**
 * =====================================
 * !Helmet - Adds security HTTP headers
 * !Protects app from common web attacks
 * ======================================
 */

app.use(
  helmet({
    contentSecurityPolicy: false, //Disabled because payment gateway (Razorpay) loads external scripts
  })
);

/**
 * ==============================
 * !MIDDLEWARE
 * ==============================
 */

app.use(morgan("dev"));

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

// console frontend url 
console.log(env.FRONTEND_URL);

//? PARSE JSON PAYLOAD -  request with JSON data
app.use(express.json());

//?Parse URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

//? Middleware to parse cookies from incoming requests
app.use(cookieParser());


/**
 * ======================================
 * !Health Check Route
 * ======================================
 * Simple endpoint to verify server is running.
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    
  });
});


/**
 * ======================================
 * !Registering All API Routes
 * ======================================
 * All application routes are mounted under /api/v1
 */

/**
 * ======================================
 * ! Global Middleware Pipeline
 * ======================================
 * Order matters — top one runs first
 *
 * 1. optionalAuth
 *    • Checks for JWT token on every incoming request
 *    • Valid token   → attaches decoded payload to req.user
 *    • No token / invalid token → sets req.user = null (guest)
 *    • Does not block any route — only identifies the user
 *    • Must run BEFORE maintenanceGuard
 *      so that req.user is available for role checking
 *
 * 2. maintenanceGuard
 *    • Must run AFTER optionalAuth — requires req.user
 *    • Maintenance mode OFF → allow all requests
 *    • Maintenance mode ON  →
 *        Admin (req.user.role === "admin") → allow
 *        Login route → allow only if user is admin
 *        Everything else → 503 Service Unavailable
 *
 * 3. rateLimiter (only on /api/v1)
 *    • Restricts each IP to 100 requests per minute
 *    • Protects against brute-force, spam, and abuse
 *    • Limit exceeded → 429 Too Many Requests
 */


app.use(optionalAuth);
app.use(maintenanceMode);
app.use("/api/v1", rateLimiter, routes);



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
