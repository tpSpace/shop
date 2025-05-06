import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/siteData";
import { Button } from "../ui/button";

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-8">
          <span className="text-sm block">CATEGORY</span>
          Design your perfect home
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/products/${category.slug}`}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                </Link>
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-start">
                <p className="font-medium text-gray-800 text-lg">
                  {category.title}
                </p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {category.description}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button className="bg-black text-white hover:bg-gray-800">
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
