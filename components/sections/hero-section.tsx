import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { heroProducts } from "@/data/siteData";

export function HeroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Discover elegant & affordable furniture for every room
          </h1>
          <p className="text-gray-600 mb-6">
            Transform your home with sophisticated style pieces, and create
            serene and inviting homes.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 self-start">
            <Link href="/products">Shop Now</Link>
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Free delivery. Always on time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {heroProducts.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-start">
                <p className="text-sm text-gray-600">{product.title}</p>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
