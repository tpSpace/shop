import apiClient from "./apiClient";
import {
  Product,
  PaginatedProducts,
  RatingRequest,
  Rating,
  ProductResponse,
  ProductImageDto,
} from "@/lib/types";

// File: lib/api/products.ts

// Define sort options type for better type safety
type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

export const getAllProducts = async (
  page: number = 0,
  size: number = 12,
  categoryId: string = "",
  query: string = "",
  sort: SortOption = "newest",
  minPrice?: number,
  maxPrice?: number
): Promise<PaginatedProducts | null> => {
  try {
    // Build request parameters with type safety
    const params: Record<string, string | number> = {
      page: page.toString(),
      size: size.toString(),
    };

    // Add category filter if provided
    if (categoryId) {
      params.categoryId = categoryId;
    }

    // Add search query if provided
    if (query) {
      params.keyword = query;
    }

    // Add price filters if provided
    if (minPrice !== undefined && minPrice >= 0) {
      params.minPrice = minPrice;
    }

    if (maxPrice !== undefined && maxPrice > 0) {
      params.maxPrice = maxPrice;
    }

    // Add sorting parameters with type safety
    switch (sort) {
      case "price_asc":
        params.sortBy = "price";
        params.direction = "asc";
        break;
      case "price_desc":
        params.sortBy = "price";
        params.direction = "desc";
        break;
      case "name_asc":
        params.sortBy = "name";
        params.direction = "asc";
        break;
      case "name_desc":
        params.sortBy = "name";
        params.direction = "desc";
        break;
      default:
        // Default to newest first
        params.sortBy = "createdAt";
        params.direction = "desc";
    }

    // Make API request with error handling
    const response = await apiClient.get<PaginatedProducts>(
      "/api/v1/products",
      { params }
    );

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // You might want to throw the error here to handle it in the UI
    throw error;
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

// Fetch product by ID with fallback for 401 errors
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // Try standard endpoint first
    try {
      const response = await apiClient.get<ProductResponse>(
        `/api/v1/products/${id}/details`
      );
      // Optionally fetch images
      const imagesResponse = await apiClient.get<ProductImageDto[]>(
        `/api/v1/products/${id}/images`
      );
      return {
        ...response.data,
        images: imagesResponse.data.map((img) => img.imageData),
      } as Product; // Removed comment about fetching ratings
    } catch (error) {
      // Handle error or fallback logic
      throw error;
    }
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
};
export const getProductImages = async (
  productId: string
): Promise<string[]> => {
  try {
    const response = await apiClient.get<ProductImageDto[]>(
      `/api/v1/products/${productId}/images`
    );
    return response.data.map((img) => img.imageData);
  } catch (error) {
    console.error(`Failed to fetch images for product ${productId}:`, error);
    return [];
  }
};
// Rest of your API methods remain unchanged
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
  ratingData: RatingRequest
): Promise<Rating | null> => {
  try {
    const response = await apiClient.post<Rating>(
      "/api/v1/ratings",
      ratingData
    );
    console.log(response.data);
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
    const response = await apiClient.get<Rating[]>("/api/v1/ratings/product", {
      params: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ratings for product ${productId}:`, error);
    return [];
  }
};

export const getRatingsByProductId = async (productId: string): Promise<Rating[]> => {
  try {
    const response = await apiClient.get<Rating[]>(`/api/v1/ratings/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ratings for product ${productId}:`, error);
    return [];
  }
};

export const getAverageRatingForProduct = async (productId: string): Promise<number> => {
  try {
    const response = await apiClient.get<number>(`/api/v1/ratings/average/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch average rating for product ${productId}:`, error);
    return 0; // Default to 0 if there's an error
  }
};