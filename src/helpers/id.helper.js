/**================= GENERATE DEPARTMENT ID ============================= */
export const generateDepartmentId = (departmentName) => {
  if (!departmentName || typeof departmentName !== "string") {
    throw new Error("Department name is required to generate department ID");
  }
  const prefix = "DEP";

  // Take first 3 characters of department name
  const nameCode = departmentName
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3)
    .padEnd(3, "X"); // fallback if name < 3 chars

  // Generate random 3-digit number
  const randomNumber = Math.floor(100 + Math.random() * 900);

  return `${prefix}-${nameCode}-${randomNumber}`;
};

export const generateId = (prefix) => {
  if (!prefix || typeof prefix !== "string") {
    throw new Error("Prefix is required to generate ID");
  }

  const nameCode = prefix
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3)
    .padEnd(3, "X"); // fallback if name < 3 chars

  return `${nameCode}-${Date.now().toString().slice(-4)}`;
};
