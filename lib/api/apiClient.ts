import axios from "axios";

// Determine the base URL based on the environment
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    // Check if running in browser environment before accessing localStorage
    if (typeof window !== "undefined") {
      const authData = localStorage.getItem("auth-storage");
      if (authData) {
        const { state } = JSON.parse(authData);
        const token = state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
