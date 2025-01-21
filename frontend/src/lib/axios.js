import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://email-builder-backend-0fvw.onrender.com/api",
  withCredentials: true,
});