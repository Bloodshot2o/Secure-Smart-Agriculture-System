// ✅ Correct:
import { jwtDecode } from "jwt-decode";


export const removeToken = () => localStorage.removeItem("token");


export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode(token); // includes { id, role, exp }
  } catch {
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
