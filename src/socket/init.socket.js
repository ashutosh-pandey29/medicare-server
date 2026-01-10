// creating socket server

import { Server } from "socket.io";
import { env } from "../config/env.js";
let io;

export const initSocket = (httpServer) => {
  // create server
  io = new Server(httpServer, {
    cors: {
      origin: `${env.FRONTEND_URL}`,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
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
