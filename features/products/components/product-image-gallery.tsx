"use client";

import { useState } from "react";
import Image from "next/image";
import { formatBase64Image } from "@/lib/utils";

interface ImageThumbnailProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
}

const ImageThumbnail = ({
  src,
  alt,
  isActive,
  onClick,
}: ImageThumbnailProps) => (
  <div
    className={`cursor-pointer border-2 rounded-md overflow-hidden transition-all ${
      isActive ? "border-primary" : "border-transparent"
    }`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    role="button"
    tabIndex={0}
    aria-label={`View ${alt}`}
  >
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className="object-cover aspect-square"
    />
  </div>
);

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const hasMultipleImages = images && images.length > 1;

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <>
      {/* Main Product Image */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        {images && images.length > 0 ? (
          <Image
            src={formatBase64Image(images[activeImageIndex]) || ""}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        ) : (
          <Image
            src="/placeholder.svg"
            alt="Placeholder Image"
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Image Thumbnails */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {images.map((image, index) => (
            <ImageThumbnail
              key={index}
              src={formatBase64Image(image) || ""}
              alt={`${productName} thumbnail ${index + 1}`}
              isActive={index === activeImageIndex}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
