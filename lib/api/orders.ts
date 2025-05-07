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
  } catch (error: unknown) {
    console.error(
      `Failed to create order for user ${orderData.userId}:`,
      error
    );
    return null;
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
