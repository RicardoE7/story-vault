import { request } from "./client";

const register = ({ username, email, password }) => {
  return request("/api/users/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
};

const login = ({ email, password }) => {
  return request("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

const getCurrentUser = () => {
  return request("/api/users/me");
};

export { register, login, getCurrentUser };
