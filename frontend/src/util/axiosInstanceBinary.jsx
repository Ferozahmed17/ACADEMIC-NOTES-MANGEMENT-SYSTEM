import axios from "axios";

const baseURL = import.meta.env.VITE_API || "http://localhost:3000";

const axiosInstanceBinary = axios.create({
  baseURL,
  // don't set Content-Type for FormData here — axios will add the boundary automatically
  withCredentials: true,
});

export default axiosInstanceBinary;
