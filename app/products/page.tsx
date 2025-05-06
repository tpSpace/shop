import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIKE - Shop All Products",
  description:
    "Browse our full collection of elegant and affordable furniture.",
  keywords: ["furniture", "shop furniture", "affordable furniture"],
  openGraph: {
    title: "AIKE - Shop All Products",
    description: "Explore our wide range of stylish furniture.",
    url: "https://your-furniture-store.com/products",
    images: ["/images/og-image.jpg"],
  },
};

const products = [
  {
    id: 1,
    title: "Modern Sofa",
    price: 799.99,
    image: "/images/sofa.jpg",
    category: "living",
  },
  {
    id: 2,
    title: "Wooden Dining Table",
    price: 499.99,
    image: "/images/dining-table.jpg",
    category: "dining",
  },
  {
    id: 3,
    title: "Ergonomic Chair",
    price: 199.99,
    image: "/images/chair.jpg",
    category: "office",
  },
  {
    id: 4,
    title: "Coffee Table",
    price: 149.99,
    image: "/images/coffee-table.jpg",
    category: "living",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-black">
            AIKE
          </Link>
          <div className="flex space-x-6 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-black hover:bg-gray-100"
                >
                  Category <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=promo">Promo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=interior">
                    Interior Design
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products?category=recommendation">
                    Product Recommendation
                  </Link>
                </DropdownMenuItem>
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
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6 text-black" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-black mb-8">
            Our Furniture Collection
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </CardContent>
                <CardFooter className="p-4">
                  <CardTitle className="text-sm">{product.title}</CardTitle>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <Button asChild variant="outline" className="mt-2 w-full">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-200">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-black mb-4">AIKE</h3>
            <p className="text-gray-600">© 2024 AIKE. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black mb-2">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black mb-2">Category</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/products?category=living">Living Room</Link>
              </li>
              <li>
                <Link href="/products?category=bedroom">Bedroom</Link>
              </li>
              <li>
                <Link href="/products?category=dining">Dining Room</Link>
              </li>
              <li>
                <Link href="/products?category=office">Home Office</Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3 mt-4">
            <div className="flex justify-center md:justify-start space-x-2">
              <Input
                type="email"
                placeholder="Email newsletter..."
                className="w-full md:w-64"
              />
              <Button className="bg-black text-white hover:bg-gray-800">
                +
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
