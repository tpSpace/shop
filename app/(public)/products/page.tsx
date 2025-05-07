import { getAllProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductCard } from "@/features/products/components/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

// Add type for sort options
type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

interface ProductsPageProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    size?: string;
    sort?: SortOption;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Await the searchParams
  const params = await searchParams;

  // Parse query parameters
  const query = params?.query || "";
  const categoryId = params?.category || "";
  const minPrice = params?.minPrice ? parseFloat(params.minPrice) : undefined;
  const maxPrice = params?.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const page = parseInt(params?.page || "0", 10);
  const size = parseInt(params?.size || "12", 10);
  const sort = (params?.sort || "newest") as SortOption;

  // Fetch products and categories in parallel
  const [productsData, categories] = await Promise.all([
    getAllProducts(page, size, categoryId, query, sort, minPrice, maxPrice),
    getCategories(),
  ]);

  const products = productsData?.content || [];
  const totalPages = productsData?.totalPages || 1;
  const currentPage = productsData?.number || 0;
  const totalProducts = productsData?.totalElements || 0;

  // Sort options
  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Name: A-Z", value: "name_asc" },
    { label: "Name: Z-A", value: "name_desc" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <Card className="lg:w-1/4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              {/* Search input */}
              <div className="space-y-2">
                <label htmlFor="query" className="text-sm font-medium">
                  Search
                </label>
                <Input
                  id="query"
                  name="query"
                  type="text"
                  placeholder="Search products..."
                  defaultValue={query}
                />
              </div>

              {/* Category select */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select name="category" defaultValue={categoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price range */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="minPrice" className="text-xs text-gray-500">
                      Min
                    </label>
                    <Input
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      placeholder="Min"
                      defaultValue={minPrice}
                      min={0}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="text-xs text-gray-500">
                      Max
                    </label>
                    <Input
                      id="maxPrice"
                      name="maxPrice"
                      type="number"
                      placeholder="Max"
                      defaultValue={maxPrice}
                      min={0}
                    />
                  </div>
                </div>
              </div>

              {/* Sort select */}
              <div className="space-y-2">
                <label htmlFor="sort" className="text-sm font-medium">
                  Sort By
                </label>
                <Select name="sort" defaultValue={sort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply filters button */}
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Main content */}
        <div className="lg:w-3/4">
          {/* Results summary */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {products.length} of {totalProducts} products
            </p>
            <div className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Sorted by:{" "}
                {sortOptions.find((o) => o.value === sort)?.label || "Newest"}
              </span>
            </div>
          </div>

          {/* Product grid */}
          {products.length === 0 ? (
            <div className="text-center bg-gray-50 rounded-lg p-12">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button asChild variant="outline">
                <Link href="/products">Clear all filters</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                asChild
                variant="outline"
                disabled={currentPage === 0}
                size="sm"
              >
                <Link
                  href={{
                    pathname: "/products",
                    query: {
                      query: query,
                      category: categoryId,
                      minPrice: minPrice?.toString(),
                      maxPrice: maxPrice?.toString(),
                      sort: sort,
                      page: (currentPage - 1).toString(),
                    },
                  }}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Link>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + Math.max(0, currentPage - 2);
                  if (pageNum >= totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      asChild
                    >
                      <Link
                        href={{
                          pathname: "/products",
                          query: {
                            query: query,
                            category: categoryId,
                            minPrice: minPrice?.toString(),
                            maxPrice: maxPrice?.toString(),
                            sort: sort,
                            page: pageNum.toString(),
                          },
                        }}
                      >
                        {pageNum + 1}
                      </Link>
                    </Button>
                  );
                })}
              </div>

              <Button
                asChild
                variant="outline"
                disabled={currentPage >= totalPages - 1}
                size="sm"
              >
                <Link
                  href={{
                    pathname: "/products",
                    query: {
                      query: query,
                      category: categoryId,
                      minPrice: minPrice?.toString(),
                      maxPrice: maxPrice?.toString(),
                      sort: sort,
                      page: (currentPage + 1).toString(),
                    },
                  }}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
