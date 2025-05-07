import { Category } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">
          Shop by Category
        </h2>
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="block group"
              >
                <Card className="overflow-hidden transition-shadow hover:shadow-md h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    {/* Optional: Add category image here */}
                    {/* <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden bg-muted">
                       <Image src={category.imageUrl || "/placeholder.svg"} alt={category.name} fill className="object-cover"/>
                    </div> */}
                    <CardTitle className="text-base font-medium group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No categories available at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
