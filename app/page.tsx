import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-amber-100 to-amber-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Elevate Your Home with Premium Furniture
          </h1>
          <p className="text-lg md:text-xl mb-6 text-muted-foreground max-w-2xl mx-auto">
            Discover handcrafted, modern furniture designed for comfort and
            style. Transform your space today.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Modern Sofa",
                price: 799.99,
                image: "/images/sofa.jpg",
              },
              {
                title: "Wooden Dining Table",
                price: 499.99,
                image: "/images/dining-table.jpg",
              },
              {
                title: "Ergonomic Chair",
                price: 199.99,
                image: "/images/chair.jpg",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="text-xl font-semibold">
                    {product.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/products/${index + 1}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to Redesign Your Space?
          </h2>
          <p className="text-lg mb-6 text-muted-foreground max-w-xl mx-auto">
            Explore our full collection and find the perfect pieces for your
            home.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/products">
              Browse All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
