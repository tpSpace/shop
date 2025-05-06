import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

import { products } from "@/data/siteData";

export function PopularSection() {
  const popularProducts = products.slice(0, 3); // Top 3 popular products

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-8">
          <span className="text-sm block">POPULAR</span>
          Furniture Sale Now On!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {popularProducts.map((product, index) => (
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
              <CardFooter className="p-4 flex flex-col items-center">
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
