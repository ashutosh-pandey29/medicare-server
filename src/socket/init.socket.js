// import socket.io
import { Server } from "socket.io";

// import env variable
import { env } from "../config/env.js";

// Store io instance globally
let io;

export const initSocket = (httpServer) => {
  // Create new Socket.IO server attached to HTTP server
  io = new Server(httpServer, {
    cors: {
      origin: `${env.FRONTEND_URL}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const isProd = env.NODE_ENV === "production";
//   console.log("socket front", env.FRONTEND_URL);

  // Listen for new client connections
  io.on("connection", (socket) => {
    if (!isProd) {
      console.log("Socket connected:", socket.id);
    }

    // Used to join user-specific room
    socket.on("join", (userId) => {
      // Each user joins a room named by their userId
      socket.join(userId);

      if (!isProd) {
        console.log(`User joined room: ${userId}`);
      }
    });

    // disconnect event
    socket.on("disconnect", () => {
      if (!isProd) {
        console.log("Socket disconnected:", socket.id);
      }
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
