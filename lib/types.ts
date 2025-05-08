export interface RatingRequest {
  productId: string; // UUID as string for compatibility
  score: number;
  comment: string;
  userId: string; // UUID as string for compatibility
} 