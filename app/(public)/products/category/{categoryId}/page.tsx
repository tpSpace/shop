import { getProductsByCategory } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories"; // To potentially get category name
import { ProductCard } from "@/features/products/components/product-card";
import { Category } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

interface CategoryProductPageProps {
  params: { categoryId: string };
  searchParams: { page?: string; size?: string };
}

// Function to fetch category details (optional, for displaying name)
async function getCategoryDetails(
  categoryId: string
): Promise<Category | null> {
  try {
    // Assuming a backend endpoint exists to get a single category by ID
    // If not, we might need to fetch all and filter, or adjust the backend
    const categories = await getCategories(); // Re-use existing fetch all
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category || null;
  } catch (error) {
    console.error(`Failed to fetch details for category ${categoryId}:`, error);
    return null;
  }
}

export default async function CategoryProductPage({
  params,
  searchParams,
}: CategoryProductPageProps) {
  const { categoryId } = params;
  const currentPage = parseInt(searchParams.page || "0", 10);
  const pageSize = parseInt(searchParams.size || "12", 10); // Default to 12 items per page

  // Fetch products and category details in parallel
  const [productsData, categoryDetails] = await Promise.all([
    getProductsByCategory(categoryId, currentPage, pageSize),
    getCategoryDetails(categoryId), // Fetch category name
  ]);

  // Handle case where category or products are not found
  if (!productsData) {
    // If category exists but no products, show message
    if (categoryDetails) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{categoryDetails.name}</h1>
          <p>No products found in this category yet.</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      );
    }
    // If category itself not found
    notFound();
  }

  const { content: products, totalPages } = productsData;
  const categoryName = categoryDetails?.name || "Category"; // Use fetched name or default

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
      {products.length === 0 ? (
        <p>No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-4">
          <Button variant="outline" disabled={currentPage === 0} asChild>
            <Link href={`?page=${currentPage - 1}&size=${pageSize}`}>
              Previous
            </Link>
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages - 1}
            asChild
          >
            <Link href={`?page=${currentPage + 1}&size=${pageSize}`}>Next</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
