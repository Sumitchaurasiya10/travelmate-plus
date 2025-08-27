import API from "./api";

// Register
export const register = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  // Save both token and user properly
  localStorage.setItem(
    "user",
    JSON.stringify({ token: res.data.token, ...res.data.user })
  );
  return res.data;
};

// Login
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  localStorage.setItem(
    "user",
    JSON.stringify({ token: res.data.token, ...res.data.user })
  );
  return res.data;
};
