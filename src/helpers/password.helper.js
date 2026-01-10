import bcrypt from "bcrypt";

// hash password
export const hashPassword = async (rowPassword) => {
  const round = 10;
  const hashedPassword = await bcrypt.hash(rowPassword, round);
  return hashedPassword;
};

// verify password

export const verifyPassword = async (rowPassword, hashedPassword) => {
  const isVerified = await bcrypt.compare(rowPassword, hashedPassword);
  return isVerified;
};