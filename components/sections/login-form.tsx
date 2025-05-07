"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login, getCurrentUser } from "@/lib/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Login and get token
      const authResponse = await login(data);
      
      if (!authResponse || !authResponse.token) {
        throw new Error("Invalid login response");
      }
      
      // Get user data with the token
      const user = await getCurrentUser();
      
      // Save auth info to store
      setAuth(authResponse.token, user);
      
      // Redirect to homepage
      router.push("/");
      router.refresh(); // Force refresh to update navbar state
    } catch (err: any) {
      // Handle various error types
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="text-sm text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              // Add forgot password functionality
              alert("Forgot password functionality not implemented yet");
            }}
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
}