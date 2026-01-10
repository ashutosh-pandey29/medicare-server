import { getIO } from "./init.socket.js";
export const notifyRealtime = async (userId, payload) => {
  try {
    const io = getIO();

    io.to(userId.toString()).emit("notification", payload);
    console.log("notification send ");
  } catch (err) {
    console.error("Socket notification failed:", err);
  }
};
