import { Category } from "./categories-schema";
import { Rating } from "./rating";

// Base Product interface - includes all common properties
export type Product = {
  categoryName: string;
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  images?: string[];
  ratings?: Rating[];
  createdAt?: string;
  updatedAt?: string;
  averageRating?: number;
};

// Interface for paginated product responses
export type PaginatedProducts = {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // Current page number
  size: number; // Page size
};

// Product details from the details endpoint (no images)
export type ProductResponse = Omit<Product, "images">;

// Image DTO returned by the images endpoint
export type ProductImageDto = {
  id: string;
  productId: string;
  imageData: string;
};
