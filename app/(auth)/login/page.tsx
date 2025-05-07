import { LoginForm } from "@/components/sections/login-form"; // Recreate this component
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login - IdeaZ",
  description: "Log in to your IdeaZ account.",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
