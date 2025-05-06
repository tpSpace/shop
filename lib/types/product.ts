import { Category } from "./categories-schema";
import { Rating } from "./rating";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category?: Category; // Optional, might not always be loaded
  images?: string[]; // Optional array of images
  ratings?: Rating[]; // Optional array of ratings
  createdAt?: string; // Or Date
  updatedAt?: string; // Or Date
  // Add averageRating if calculated/provided by backend
  averageRating?: number;
}

// If backend uses a different structure for paginated products
export interface PaginatedProducts {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // Current page number
  size: number; // Page size
  // Add other pagination fields if needed
}
