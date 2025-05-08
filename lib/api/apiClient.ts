import axios from "axios";
import { useAuthStore } from '@/lib/store/authStore';

// Determine the base URL based on the environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up Axios interceptors to include token in headers
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().jwt;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
