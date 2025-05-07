import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export const formatBase64Image = (
  imageUrl: string,
  mimeType?: string
): string | null => {
  if (imageUrl === "") {
    return null;
  }
  const mime = mimeType || "image/jpeg"; // Fallback to JPEG
  return `data:${mime};base64,${imageUrl}`;
};
