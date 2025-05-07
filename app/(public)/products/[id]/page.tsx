import { getProductById } from "@/lib/api/products";
import { Rating } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShoppingBag,
  ChevronRight,
  Heart,
  Share2,
  Award,
} from "lucide-react";
import { Suspense } from "react";
import { AddToCartForm } from "@/features/products/components/add-to-cart-form";
import { RatingInput } from "@/features/products/components/rating-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import ProductImageGallery from "@/features/products/components/product-image-gallery";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

// Helper to render stars
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-5 w-5 text-yellow-400 fill-yellow-400"
        />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};

// Helper function to calculate average rating
function calculateAverageRating(ratings: Rating[] | undefined): number {
  if (!ratings || ratings.length === 0) {
    return 0;
  }
  const totalRating = ratings.reduce(
    (sum, rating) => sum + rating.ratingValue,
    0
  );
  return totalRating / ratings.length;
}

// Review Component
const Review = ({ rating }: { rating: Rating }) => (
  <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm mb-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {rating.id?.substring(0, 2) || "U"}
          </span>
        </div>
        <div>
          <p className="font-medium">Customer</p>
          <div className="flex">{renderStars(rating.ratingValue)}</div>
        </div>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(rating.createdAt).toLocaleDateString()}
      </span>
    </div>
    {rating.comment && <p className="text-gray-700 mt-2">{rating.comment}</p>}
  </div>
);

// Main Product Detail Page Component (Server Component)
export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const params = await props.params;
  const { id } = params;
  const product = await getProductById(id);
  if (!product) {
    notFound(); // Trigger 404 if product not found
  }
  const averageRating = calculateAverageRating(product.ratings);

  // Breadcrumb paths using category directly from product
  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    {
      name: product.category ? product.category.name : "Category",
      href: product.category
        ? `/products/category/${product.category.id}`
        : "/products/all",
    },
    { name: product.name, href: `/products/${id}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6 text-sm text-gray-500">
        {breadcrumbPaths.map((path, index) => (
          <div key={`${index}-${path.href}`} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            {index === breadcrumbPaths.length - 1 ? (
              <span className="font-medium text-gray-900">{path.name}</span>
            ) : (
              <Link href={path.href} className="hover:text-primary">
                {path.name}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <Suspense
            fallback={
              <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            }
          >
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
            />
          </Suspense>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          {/* Title and basic info */}
          <div className="mb-6">
            {product.quantity <= 5 && product.quantity > 0 && (
              <Badge className="mb-2 bg-amber-500">
                Only {product.quantity} left
              </Badge>
            )}
            {product.quantity === 0 && (
              <Badge className="mb-2 bg-red-500">Out of Stock</Badge>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              {renderStars(averageRating)}
              {product.ratings && product.ratings.length > 0 && (
                <Link
                  href="#reviews"
                  className="ml-2 text-sm text-blue-600 hover:underline"
                >
                  ({product.ratings.length} reviews)
                </Link>
              )}
            </div>

            <div className="text-3xl font-bold text-primary mb-4">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 mb-6">
            <Button size="sm" variant="outline">
              <Heart className="h-4 w-4 mr-2" /> Wishlist
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>

          {/* Product description */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-wrap">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 mb-6">
            <AddToCartForm product={product} />
          </div>

          {/* Shipping & Returns (Static content example) */}
          <div className="py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag className="h-5 w-5 text-gray-500" />
              <span className="font-medium">
                Free shipping on orders over $50
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-gray-500" />
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Additional Details</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.ratings?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="p-6 border rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Specifications
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Item ID: {product.id}</li>
                  {/* Fixed to consistently use category.name */}
                  <li>Category: {product.categoryName || "Uncategorized"}</li>
                  <li>In Stock: {product.quantity} units</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Care Instructions
                </h4>
                <p className="text-gray-600">
                  Please refer to the product manual for detailed care
                  instructions.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="p-6 border rounded-lg mt-4"
            id="reviews"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Rating Summary */}
              <div className="md:w-1/3">
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    <div>
                      {renderStars(averageRating)}
                      <p className="text-sm text-gray-500">
                        {product.ratings?.length || 0} reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add your review */}
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Add Your Review</h4>
                  <RatingInput productId={product.id} />
                </div>
              </div>

              {/* Reviews List */}
              <div className="md:w-2/3">
                {product.ratings && product.ratings.length > 0 ? (
                  <div className="space-y-4">
                    {product.ratings.map((rating) => (
                      <Review key={rating.id} rating={rating} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-lg mb-2">No Reviews Yet</h4>
                    <p className="text-gray-500 mb-4">
                      Be the first to review this product
                    </p>
                    <Button>Write a Review</Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="p-6 border rounded-lg mt-4">
            <h3 className="text-lg font-semibold mb-3">Shipping & Returns</h3>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium mb-2">Shipping Information</h4>
                <p>
                  Orders typically ship within 1-2 business days. Standard
                  shipping takes 3-5 business days to arrive.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Return Policy</h4>
                <p>
                  If you&apos;re not fully satisfied with your purchase, you can
                  return it within 30 days for a full refund.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">International Shipping</h4>
                <p>
                  We offer international shipping to select countries. Shipping
                  times and fees vary by location.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
