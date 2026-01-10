export const generateUniqueUsername = (displayName) => {
  const length = 4;
  let normalizedUsername = (displayName || "user")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, ""); // ONLY a-z & 0-9

  let randomDigit = Math.floor(Math.pow(10, length - 1) + Math.random() * Math.pow(10, length));

  const username = `${normalizedUsername}${randomDigit}`;

  return username;
};
