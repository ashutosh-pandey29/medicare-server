import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import "./config/passport.js";

//? Create an instance of the Express application
//? This 'app' will be used to define routes, middlewares, and server configuration
const app = express();

//? importing app  routes
import routes from "./routes/index.routes.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { cronScheduler } from "./cron/cronScheduler.js";
import { mailTo } from "./services/email/mailTo.service.js";

//? importing global error handler middleware

/**
 * ==============================
 * !MIDDLEWARE
 * ==============================
 */

//? Allow all origins
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("app url ",env.FRONTEND_URL);

//? PARSE JSON PAYLOAD -  request with JSON data
app.use(express.json());

//?Parse URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

//? Middleware to parse cookies from incoming requests
app.use(cookieParser());

/**
 * =============================
 * !REGISTERING ALL ROUTES
 * =============================
 */
app.use("/api/v1", routes);

/**
 * ===============================
 * ! REDIRECT FRONTEND
 * ===============================
 */

// app.use((req, res, next) => {
//   if (!req.path.startsWith("/api")) {
//     return res.redirect(`${env.FRONTEND_URL}`);
//   }
//   next();
// });

app.get("/mail-test", async (req, res) => {
  try {
    await mailTo({
      to: "dtest5446@gmail.com",
      subject: "Brevo Test",
      text: "<h2>It works!</h2>",
    });
    res.send("MAIL SENT success");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


/**
 * ================================
 * ! CRON SCHEDULAR - START
 * ================================
 */

cronScheduler();

/**
 * ============================
 * !GLOBAL ERROR HANDLER
 * ============================
 */
app.use(globalErrorHandler);

export default app;
