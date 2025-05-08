import { useAuthStore } from "../store/authStore";
import apiClient from "./apiClient";
import { User } from "@/lib/types";

// Updated to match backend response structure
interface AuthResponse {
  jwt: string;
  role: string;
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
  bio?: string;
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
      jwt: response.data.jwt,
      role: response.data.role,
      userId: response.data.userId,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      bio: response.data.bio,
    };
  } catch (error: any) {
    console.error("Registration failed:", error);
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return {
          jwt: "",
          role: "",
            userId: "",
          firstName: "",
          lastName: "",
          message: error.response.data,
        };
      }
      return { ...error.response.data, jwt: "" };
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
    const response = await apiClient.post<any>(
      "/api/auth/login",
      requestData
    );
    console.log(response.data);
    
    // Map backend response to our expected format
    return {
      jwt: response.data.token,
      role: response.data.role,
      userId: response.data.userId,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
    };
  } catch (error: any) {
    console.error("Login failed:", error);
    if (error.response && error.response.data) {
      if (typeof error.response.data === "string") {
        return {
          jwt: "",
          role: "",
          userId: "",
          firstName: "",
          lastName: "",
          message: error.response.data,
        };
      }
      return { ...error.response.data, jwt: "" };
    }
    return null;
  }
};