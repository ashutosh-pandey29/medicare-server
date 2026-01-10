export const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9]{3,30}$/;
  return regex.test(username);
};

export const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};
