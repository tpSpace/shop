import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { Category } from "@/lib/types/categories-schema";

// Create or reuse API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api",
  withCredentials: true,
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const jwt = useAuthStore.getState().jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

// Function to fetch categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/v1/categories");

    // Handle different response structures
    const data = response.data;

    // Return the data in the appropriate format based on your API structure
    if (Array.isArray(data)) {
      return data;
    } else if (data?.categories && Array.isArray(data.categories)) {
      return data.categories;
    } else if (data?.content && Array.isArray(data.content)) {
      return data.content;
    } else {
      console.error("Unexpected API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// React Query hook
export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
