import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { categories } from "@/data/siteData";

export function Footer() {
  return (
    <footer className="py-8 bg-gray-200 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-black mb-4">IdeaZ</h3>
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
          <ul className="space-y-2 text-gray-600 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/products/${category.slug}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-black mb-2">
            Join our newsletter
          </h4>
          <div className="flex justify-center md:justify-start space-x-2">
            <Input
              type="email"
              placeholder="Email"
              className="w-full md:w-64"
            />
            <Button className="bg-black text-white hover:bg-gray-800">+</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            © 2025 IdeaZ. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-start space-x-2 text-sm text-gray-600">
            <Link href="/terms">Terms of Condition</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
