import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";
const API = axios.create({
  baseURL: baseUrl,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
  }
  return req;
});

export const userRegister = (registerValue) =>
  API.post("/register", registerValue);
export const userLogin = (loginValue) => API.post("/login", loginValue);
export const userProfile = () => API.get("/me");
export const addLogs = (logForm) => API.post("/addlogs", logForm);
export const getLogs = () => API.get("/logs/");
