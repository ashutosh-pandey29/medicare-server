import { getIO } from "./init.socket.js";
export const notifyRealtime = async (userId, payload) => {
  try {
    const io = getIO();

    io.to(userId.toString()).emit("notification", payload);
    console.log("notification sent to:", userId);
  } catch (err) {
    console.error("Socket notification failed:", err);
  }
};
