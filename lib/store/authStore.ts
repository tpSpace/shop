import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  // Add other user properties as needed
};

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (token, user) => {
        // Store token in localStorage for axios interceptor
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }

        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      clearAuth: () => {
        // Remove token from localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }

        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
