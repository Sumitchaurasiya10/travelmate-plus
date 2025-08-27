import API from "./api";

// REGISTER
export const register = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });

  // Save proper structure
  const userData = {
    token: res.data.token,
    user: res.data.user
  };

  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};

// LOGIN
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });

  // Save proper structure
  const userData = {
    token: res.data.token,
    user: res.data.user
  };

  localStorage.setItem("user", JSON.stringify(userData));
  return userData;
};
