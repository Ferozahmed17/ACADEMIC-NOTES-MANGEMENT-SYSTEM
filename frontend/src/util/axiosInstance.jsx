import axios from "axios";

const baseURL = import.meta.env.VITE_API || "https://academic-notes-mangement-system.onrender.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
