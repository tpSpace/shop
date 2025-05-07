// /home/ubuntu/frontend_ecommerce/app/(auth)/register/page.tsx

import { RegisterForm } from "@/components/sections/register-form"; // Recreate this component
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register - IdeaZ",
  description: "Create your account to start shopping at IdeaZ.",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm bg-card">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
        <RegisterForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
