"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { toast, Toaster } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({ isAuthenticated: false, isLoading: true });

  // Defer store access to useEffect to avoid SSR issues
  useEffect(() => {
    const { isAuthenticated, isLoading } = useAuthStore.getState();
    setAuthState({ isAuthenticated, isLoading: isLoading || false });
  }, []);

  // Update auth state when store changes
  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      setAuthState({
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading || false,
      });
    });
    return () => unsubscribe();
  }, []);

  // Handle redirects for unauthenticated users
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please log in to access this page.",
      });
      router.push("/login");
    }
  }, [authState.isAuthenticated, authState.isLoading, router]);

  if (authState.isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Checking authentication...</p>
        <Toaster richColors position="top-right" />
      </div>
    );
  }

  return authState.isAuthenticated ? (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  ) : (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-muted-foreground">Redirecting to login...</p>
      <Toaster richColors position="top-right" />
    </div>
  );
}
