import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  try {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err && err.response && err.response.status === 401) {
      try {
        useAuthStore.getState().logout();
      } catch (e) {
        // ignore
      }
    }
    return Promise.reject(err);
  }
);

export default api;
