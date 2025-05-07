import { Product } from "@/lib/types";
import { ProductCard } from "@/features/products/components/product-card";
import { Button } from "../ui/button";
import Link from "next/link";

interface PopularSectionProps {
  products: Product[];
}

export function PopularSection({ products }: PopularSectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">
          Featured Products
        </h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No featured products available at the moment.
          </p>
        )}
        {/* Optional: Add a button to view all products */}
        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
