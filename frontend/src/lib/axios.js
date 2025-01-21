import axios from "axios";

const url="https://email-builder-backend-0fvw.onrender.com"
export const axiosInstance = axios.create({
  baseURL: "https://email-builder-backend-0fvw.onrender.com/api",
  withCredentials: true,
});