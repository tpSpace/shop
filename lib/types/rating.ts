import { User } from "./index"; // Assuming User type is in index.ts
import { Product } from "./product";

export interface Rating {
    id: string;
    score: number; // e.g., 1 to 5
    comment?: string; // Optional comment
    user?: User; // Optional user details
    product?: Product; // Optional product details
    createdAt: string; // Or Date
}

// Request type for creating/updating a rating
export interface RatingRequest {
    productId: string;
    score: number;
    comment: string;
    userId: string;
}

