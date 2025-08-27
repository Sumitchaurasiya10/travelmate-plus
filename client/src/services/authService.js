import API from "../api";

// Register new user
export const registerUser = (name, email, password) => {
  return API.post("/auth/register", { name, email, password });
};

// Login user
export const loginUser = (email, password) => {
  return API.post("/auth/login", { email, password });
};
