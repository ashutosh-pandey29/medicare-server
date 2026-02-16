// Import  HTTP module
import http from "http";

// Import Express app instance
import app from "./app.js";

// Import database connection function
import connectDB from "./config/dbConnection.js";

// Import environment variables config
import { env } from "./config/env.js";

// Import socket initialization function
import { initSocket } from "./socket/init.socket.js";

// START SERVER FUNCTION
const startServer = async () => {
  try {
    // CONNECTING DB
    await connectDB();

    // CREATING HTTP SERVER
    const httpServer = http.createServer(app);

    // SOCKET INIT
    initSocket(httpServer);
    // console.log("socket init");

    // LISTEN / START  SERVER
    httpServer.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  } catch (err) {
    // console.log(err);
    // If DB connection fails, exit process
    process.exit(1);
  }
};

// Call the function to start the application
startServer();
