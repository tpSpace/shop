import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";

// Sample categories data (replace with actual data source)
const categories = [
  { title: "Living Room", slug: "living-room" },
  { title: "Bedroom", slug: "bedroom" },
  { title: "Dining Room", slug: "dining-room" },
  { title: "Kitchen", slug: "kitchen" },
  { title: "Office", slug: "office" },
  { title: "Outdoor", slug: "outdoor" },
  { title: "Storage", slug: "storage" },
  { title: "Bathroom", slug: "bathroom" },
  { title: "Kids", slug: "kids" },
  { title: "Lighting", slug: "lighting" },
];

export function NavBar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          Nashfur
        </Link>
        <div className="flex space-x-6 items-center">
          <Button variant="ghost" className="text-black hover:bg-gray-100">
            <Link href="/home">Home</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-black hover:bg-gray-100">
                Category <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link href={`/products/${category.slug}`}>
                    {category.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
        </div>
      </div>
    </nav>
  );
}
