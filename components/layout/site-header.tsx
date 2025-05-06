"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore"; // Import cart store
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function SiteHeader() {
  const { user, token, logout, isAuthenticated, isLoading } = useAuthStore();
  const { getTotalItems } = useCartStore(); // Get total items from cart store
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const totalCartItems = getTotalItems(); // Get the total number of items

  useEffect(() => {
    setIsClient(true);
    // Update search input if query param changes
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    router.push("/"); // Redirect to home after logout
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="hidden font-bold sm:inline-block">Nashfur</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            {/* TODO: Add dynamic category links here if needed */}
            {/* <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">Products</Link> */}
          </nav>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 items-center space-x-2 md:ml-6">
          <Input
            type="search"
            placeholder="Search products..."
            className="h-9 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {isClient && totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {totalCartItems}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>

            {isClient && !isLoading ? (
              isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full h-8 w-8 sm:h-9 sm:w-9">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="sr-only">User Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name || user?.email || "My Account"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem> */}
                    {/* <DropdownMenuItem asChild><Link href="/orders">Orders</Link></DropdownMenuItem> */}
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-1 sm:space-x-2">
                   <Button variant="outline" size="sm" asChild>
                      <Link href="/login">
                          <LogIn className="mr-1 h-4 w-4"/> Login
                      </Link>
                   </Button>
                   <Button size="sm" asChild>
                      <Link href="/register">
                          <UserPlus className="mr-1 h-4 w-4"/> Register
                      </Link>
                   </Button>
                </div>
              )
            ) : (
              // Render placeholder or skeleton during SSR/initial load
              <div className="h-9 w-24 rounded-md bg-muted animate-pulse"></div> // Placeholder to prevent layout shift
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

