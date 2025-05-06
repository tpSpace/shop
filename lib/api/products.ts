import apiClient from "./apiClient";
import { Product, PaginatedProducts, RatingRequest, Rating } from "@/lib/types";

// Fetch all products with pagination
export const getAllProducts = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedProducts | null> => {
  try {
    const response = await apiClient.get<PaginatedProducts>(
      "/api/v1/products",
      {
        params: { page, size },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
};

// Fetch featured products (assuming an endpoint exists, or modify logic)
export const getFeaturedProducts = async (
  limit: number = 4
): Promise<Product[]> => {
  try {
    const response = await apiClient.get<PaginatedProducts>(
      "/api/v1/products",
      {
        params: {
          page: 0,
          size: limit,
          sortBy: "createdAt",
          direction: "desc",
        },
      }
    );
    return response.data.content;
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
};

// Fetch product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await apiClient.get<Product>(`/api/v1/products/${id}`);
    // console.log("Product Data:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
};

// Fetch products by category ID with pagination
export const getProductsByCategory = async (
  categoryId: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedProducts | null> => {
  try {
    const response = await apiClient.get<PaginatedProducts>(
      "/api/v1/products/by-category",
      {
        params: { categoryId, page, size },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch products for category ${categoryId}:`,
      error
    );
    return null;
  }
};

// Search products with pagination
export const searchProducts = async (
  query: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedProducts | null> => {
  try {
    const response = await apiClient.get<PaginatedProducts>(
      "/api/v1/products/search",
      {
        params: { keyword: query, page, size },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to search products with query "${query}":`, error);
    return null;
  }
};

// Add a rating to a product
export const addRating = async (
  ratingData: RatingRequest,
  token: string
): Promise<Rating | null> => {
  try {
    const response = await apiClient.post<Rating>(
      "/api/v1/ratings",
      ratingData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add rating:", error);
    return null;
  }
};

// Get ratings for a product
export const getRatingsByProduct = async (
  productId: string
): Promise<Rating[]> => {
  try {
    // Updated to match backend endpoint structure
    const response = await apiClient.get<Rating[]>("/api/v1/ratings/product", {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ratings for product ${productId}:`, error);
    return [];
  }
};
