import http from "http";
import app from "./app.js";
import connectDB from "./config/dbConnection.js";
import { env } from "./config/env.js";
import { initSocket } from "./socket/init.socket.js";

const startServer = async () => {
  try {
    //**CONNECTING DB */
    await connectDB();

    /**CREATING HTTP SERVER  */

    const httpServer = http.createServer(app);

    /**SOCKET INIT */
    initSocket(httpServer);
    console.log("socket init");

    //****LISTEN / START  SERVER***/
    httpServer.listen(env.PORT, () => {
      console.log(`Server started on port ${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
