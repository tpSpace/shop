// /home/ubuntu/frontend_ecommerce/lib/api/orders.ts

import apiClient from "./apiClient";
import { Order, OrderRequest } from "@/lib/types/order";

// Function to create a new order
export const createOrder = async (
  orderData: OrderRequest,
  token: string
): Promise<Order | null> => {
  try {
    const response = await apiClient.post<Order>("/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to create order:", error);
    // Rethrow or handle specific errors
    // Return null or throw error based on how you want to handle it in the form
    if (error.response && error.response.data) {
      // Re-throw a new error with the backend message for better handling in the component
      throw new Error(error.response.data.message || "Order placement failed.");
    }
    throw error; // Rethrow original error if no specific message
  }
};

// Function to get orders for the authenticated user (Example)
export const getMyOrders = async (token: string): Promise<Order[]> => {
  try {
    const response = await apiClient.get<Order[]>("/orders/my-orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    return [];
  }
};

// Function to get a specific order by ID (Example)
export const getOrderById = async (
  orderId: string,
  token: string
): Promise<Order | null> => {
  try {
    const response = await apiClient.get<Order>(`/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
};
