"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, ChevronDown, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetCategories } from "@/lib/api/categories";

export function NavBar() {
  const { data: categories, isLoading, error } = useGetCategories();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          Nashfur
        </Link>
        <div className="flex space-x-4 items-center">
          <Button variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/">Home</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-black hover:bg-gray-100">
                Category <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isLoading ? (
                <DropdownMenuItem disabled>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </DropdownMenuItem>
              ) : error ? (
                <DropdownMenuItem disabled>
                  Failed to load categories
                </DropdownMenuItem>
              ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/products/category/${category.id}`}>
                      {category.title || category.name}
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>
                  No categories found
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rest of your navbar code */}
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

          {/* Login Button */}
          <Button variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/login" className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Login
            </Link>
          </Button>

          {/* Register Button */}
          <Button
            variant="default"
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
