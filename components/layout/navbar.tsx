import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export function NavBar() {
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
        </div>
      </div>
    </nav>
  );
}
