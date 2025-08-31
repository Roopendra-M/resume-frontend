// frontend/src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // change to your backend URL if needed
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any; // <-- casting removes TS error safely
  }

  return config;
});

export default api;
