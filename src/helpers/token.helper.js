import crypto from "crypto";

export const createOneTimeToken = () => {
  const rowToken = crypto.randomBytes(64).toString("hex");
  const hashed = crypto.createHash("sha256").update(rowToken).digest("hex")
  return hashed;
  
}


export const validateToken = () => {
   
 }