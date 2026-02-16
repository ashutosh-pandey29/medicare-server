// Import bcrypt library for password hashing
import bcrypt from "bcrypt";

// HASH PASSWORD
export const hashPassword = async (rowPassword) => {
  const round = 10;
  const hashedPassword = await bcrypt.hash(rowPassword, round);
  return hashedPassword;
};

// VERIFY PASSWORD
export const verifyPassword = async (rowPassword, hashedPassword) => {
  const isVerified = await bcrypt.compare(rowPassword, hashedPassword);
  return isVerified;
};

// GENERATE STRONG RANDOM PASSWORD
export const generateStrongPassword = (length = 10) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specials = "!@#$%^&*()_+{}[]<>?";
  const allChars = letters + numbers + specials;

  let password =
    letters[Math.floor(Math.random() * letters.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    specials[Math.floor(Math.random() * specials.length)];

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
