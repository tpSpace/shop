import apiClient from "./apiClient";
import { User } from "@/lib/types";

// Updated to match backend response structure
interface AuthResponse {
  token: string;
  role: string;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  message?: string;
}

// Updated to match backend RegisterRequest
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// Function to register a new user - updated to match backend
export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  address: string
): Promise<AuthResponse | null> => {
  try {
    const requestData: RegisterRequest = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
    };

    const response = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      requestData
    );

    // Map the backend response to our frontend expected format
    return {
      token: response.data.token,
      role: response.data.role,
      id: response.data.id,
      username: response.data.username,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    };
  } catch (error: any) {
    console.error("Registration failed:", error);
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return {
          token: "",
          role: "",
          id: "",
          username: "",
          firstName: "",
          lastName: "",
          message: error.response.data,
        };
      }
      return { ...error.response.data, token: "" };
    }
    return null;
  }
};

// Function to log in a user - updated to match backend
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse | null> => {
  try {
    const requestData: LoginRequest = { email, password };
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      requestData
    );

    // Map backend response to our expected format
    return {
      token: response.data.token,
      role: response.data.role,
      id: response.data.id,
      username: response.data.username,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
    };
  } catch (error: any) {
    console.error("Login failed:", error);
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return {
          token: "",
          role: "",
          id: "",
          username: "",
          firstName: "",
          lastName: "",
          message: error.response.data,
        };
      }
      return { ...error.response.data, token: "" };
    }
    return null;
  }
};

// Updated to use the correct endpoint from your UserController
export const fetchUserProfile = async (
  token: string,
  userId: string
): Promise<User | null> => {
  try {
    const response = await apiClient.get(`/api/v1/users/by-id`, {
      params: { id: userId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
};
