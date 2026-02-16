// Import built-in Node.js crypto module
import crypto from "crypto";

// CREATE ONE-TIME TOKEN

export const createOneTimeToken = () => {
  const rowToken = crypto.randomBytes(64).toString("hex");
  const hashed = crypto.createHash("sha256").update(rowToken).digest("hex");
  return hashed;
};
