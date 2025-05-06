// /home/ubuntu/frontend_ecommerce/app/(public)/search/page.tsx

"use client"; // Mark as client component because it uses hooks like useSearchParams

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/api/products";
import { ProductCard } from "@/features/products/components/product-card";
import { PaginatedProducts } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const pageSize = parseInt(searchParams.get("size") || "12", 10);

  const [productsData, setProductsData] = useState<PaginatedProducts | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      setProductsData(null); // Clear results if query is empty
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchProducts(query, currentPage, pageSize);
        setProductsData(data);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to load search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, pageSize]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Search Results for <span className="text-primary">{query}</span>
      </h1>

      {isLoading ? (
        // Loading Skeleton
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(pageSize)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !productsData || productsData.content.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found matching your search.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productsData.content.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {productsData.totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-4">
              <Button variant="outline" disabled={currentPage === 0} asChild>
                <Link
                  href={`?q=${query}&page=${currentPage - 1}&size=${pageSize}`}
                >
                  Previous
                </Link>
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {productsData.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage >= productsData.totalPages - 1}
                asChild
              >
                <Link
                  href={`?q=${query}&page=${currentPage + 1}&size=${pageSize}`}
                >
                  Next
                </Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Wrap the client component in Suspense for searchParams usage
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Loading search results...</h1>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
