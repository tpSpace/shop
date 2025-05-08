// src/stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

interface AuthState {
  jwt: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      jwt: null,
      user: null,
      isAuthenticated: false,
      setAuth: (jwt, user) => set({ jwt, user, isAuthenticated: true }),
      logout: () => set({ jwt: null, user: null, isAuthenticated: false }),
      clearAuth: () => set({ jwt: null, user: null, isAuthenticated: false }),
    }),
    {
      name: "admin-auth-storage",
    }
  )
);
