import { getProductById } from "@/lib/api/products";
import { Rating } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Suspense } from "react";
import { AddToCartForm } from "@/features/products/components/add-to-cart-form"; // Recreate this component
import { RatingInput } from "@/features/products/components/rating-input"; // Recreate this component
// import { ProductImageGallery } from "@/features/products/components/product-image-gallery"; // Placeholder

interface ProductDetailPageProps {
  params: { id: string };
}

// Helper to render stars
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Simple half-star logic
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-5 w-5 text-yellow-400 fill-yellow-400"
        />
      ))}
      {/* Add half star if applicable - requires a half-star icon or complex SVG */}
      {/* {halfStar === 1 && <StarHalf key="half" className="h-5 w-5 text-yellow-400 fill-yellow-400" />} */}
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

// Component to display existing ratings
// async function ProductRatings({ productId }: { productId: string }) {
//   // Fetch ratings specifically for this component if needed, or use product data
//   // const ratings = await getRatingsByProduct(productId); // Example fetch
//   // For now, assume ratings are passed down or fetched within the main component
//   return null; // Placeholder - will integrate with product data below
// }

// Main Product Detail Page Component (Server Component)
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    notFound(); // Trigger 404 if product not foun
  }

  const averageRating = calculateAverageRating(product.ratings);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <div>
          <Suspense
            fallback={
              <div className="aspect-square bg-gray-200 animate-pulse rounded"></div>
            }
          >
            {/* Replace with actual Image Gallery Component if built */}
            {/* <ProductImageGallery images={product.images} /> */}
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                priority // Prioritize loading the main image
              />
            ) : (
              <Image
                src="/placeholder.svg"
                alt="Placeholder Image"
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            )}
          </Suspense>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            {renderStars(averageRating)}
            {product.ratings && product.ratings.length > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                ({product.ratings.length} reviews)
              </span>
            )}
          </div>
          <p className="text-3xl font-semibold text-primary mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">
            {product.description}
          </p>

          {/* Add to Cart Form (Client Component) */}
          <AddToCartForm product={product} />

          {/* Category Link */}
          {product.category && (
            <p className="text-sm text-gray-500 mt-4">
              Category:{" "}
              <Link
                href={`/products/category/${product.category.id}`}
                className="hover:underline text-primary"
              >
                {product.category.name}
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Ratings Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Ratings & Reviews</h2>
        {/* Rating Input Component - Needs to be client component & handle auth */}
        <RatingInput productId={product.id} />

        {/* Display Existing Ratings */}
        {product.ratings && product.ratings.length > 0 ? (
          <div className="mt-6 border-t pt-6 space-y-4">
            {product.ratings.map((rating) => (
              <div key={rating.id} className="border-b pb-4">
                <div className="flex items-center mb-1">
                  {renderStars(rating.ratingValue)}
                  {/* TODO: Display user name/identifier if available */}
                  {/* <span className="ml-2 text-sm font-medium">User {rating.userId?.substring(0, 6)}</span> */}
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {rating.comment && (
                  <p className="text-sm text-gray-700">{rating.comment}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-4">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
