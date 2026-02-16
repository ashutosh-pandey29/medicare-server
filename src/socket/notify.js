// Import the instance
import { getIO } from "./init.socket.js";

// SEND REAL-TIME NOTIFICATION
export const notifyRealtime = async (userId, payload) => {
  try {
    // Get initialized Socket.IO instance
    const io = getIO();

    // Emit "notification" event to a specific user's room
    io.to(userId.toString()).emit("notification", payload);
  } catch (err) {
    console.error("Socket notification failed:", err);
  }
};
