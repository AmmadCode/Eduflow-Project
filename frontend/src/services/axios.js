import axios from "axios";

// Fallback to production URL if env variable is not set
const getBaseURL = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  // Production fallback
  return "https://eduflow-project-qzlq.vercel.app";
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

export default axiosInstance;
