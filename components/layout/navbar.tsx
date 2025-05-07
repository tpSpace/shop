"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ShoppingCart, User, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";

export function NavBar() {
  // Using client-side authentication state
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors with useEffect
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    // Optional: redirect to home page
    window.location.href = "/";
  };

  // Only show authenticated UI after hydration
  if (!mounted) {
    return (
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-black">
            IdeaZ
          </Link>
          <div className="flex space-x-4 items-center">
            {/* Loading state */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          IdeaZ
        </Link>
        <div className="flex space-x-4 items-center">
          <Button variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/products">Products</Link>
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Product Search..."
              className="pl-10 w-48"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-black hover:bg-gray-100"
          >
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{user?.firstName || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="w-full flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="text-black hover:bg-gray-100">
                <Link href="/login" className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
              </Button>
              <Button
                variant="default"
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}