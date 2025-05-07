"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ImageOff } from "lucide-react";
import { formatBase64Image, formatPrice } from "@/lib/utils";
import { getProductImages } from "@/lib/api/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [productImage, setProductImage] = useState<string | null>("");
  const [imageLoading, setImageLoading] = useState(!productImage);
  const [imageError, setImageError] = useState(false);

  // Fetch image if not available
  useEffect(() => {
    if (!productImage && !imageError) {
      setImageLoading(true);

      const fetchImage = async () => {
        try {
          const images = await getProductImages(product.id);
          console.log("Fetched images:", images);
          if (images && images.length > 0) {
            setProductImage(images[0]);
          } else {
            setImageError(true);
          }
        } catch (error) {
          console.error("Error fetching product image:", error);
          setImageError(true);
        } finally {
          setImageLoading(false);
        }
      };

      fetchImage();
    }
  }, [product.id, productImage, imageError]);

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md">
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-square overflow-hidden">
        {imageLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-2 border-t-primary border-gray-200 rounded-full animate-spin"></div>
          </div>
        ) : imageError || !productImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <ImageOff className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">No image</span>
          </div>
        ) : (
          <Image
            src={formatBase64Image(productImage || "") || ""}
            alt={`${product.name} product image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjExOSIgdmlld0JveD0iMCAwIDEyMCAxMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTE5IiBmaWxsPSIjRThFOEU4Ii8+Cjwvc3ZnPgo="
            placeholder="blur"
            quality={85}
            onError={() => setImageError(true)}
          />
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Product info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-gray-900 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>

          <Button size="sm" variant="outline" className="px-2.5">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
