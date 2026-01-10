import jwt from "jsonwebtoken";

//!<--------- generate  token------------------>
export const generateJwtToken = (userPayload, secret, expireTime) => {
  try {
    // JWT token if successful, otherwise null
    const token = jwt.sign(userPayload, secret, {
      expiresIn: expireTime,
    });
    return token;
  } catch (err) {
    return null;
  }
};

//!<---------- verify JWT token --------------->
export const verifyJwtToken = (token, secret) => {
  try {
    // Decoded payload if valid, otherwise null
    const decodedPayload = jwt.verify(token, secret);
    // console.log("secrete:", secret);
    // console.log(decodedPayload);
    return decodedPayload;
  } catch (err) {
    // console.log("VERIFY ERROR:", err.name, err.message);
    return null;
  }
};
