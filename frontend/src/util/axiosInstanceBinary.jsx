import axios from "axios";

const baseURL = import.meta.env.VITE_API || "https://academic-notes-mangement-system-1-vrcs.onrender.com";

const axiosInstanceBinary = axios.create({
  baseURL,
  // don't set Content-Type for FormData here — axios will add the boundary automatically
  withCredentials: true,
});

export default axiosInstanceBinary;
