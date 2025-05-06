// Types related to Orders

import { User } from "./index";
import { Product } from "./product";

// Structure for an item within an order
export interface OrderItem {
    id: string;
    product: Product; // Include product details
    quantity: number;
    price: number; // Price at the time of order
}

// Structure for an order
export interface Order {
    id: string;
    user: User; // User who placed the order
    orderItems: OrderItem[];
    orderDate: string; // Or Date
    orderStatus: string; // e.g., PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    shippingAddress: string;
    billingAddress?: string; // Optional
    totalAmount: number;
    paymentMethod?: string; // Optional
    // Add other relevant fields like tracking number, etc.
}

// Request structure for creating an order item (used within OrderRequest)
export interface OrderItemRequest {
    productId: string;
    quantity: number;
    price: number; // Price at the time of order
}

// Request structure for creating a new order
export interface OrderRequest {
    userId: string;
    shippingAddress: string;
    billingAddress?: string;
    orderItems: OrderItemRequest[];
    totalAmount: number;
    paymentMethod?: string;
    // Add other fields required by the backend API
}

