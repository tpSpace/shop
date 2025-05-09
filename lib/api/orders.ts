"use client";

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

export function fetchOrders(status: string): Promise<Order[]> {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      reject(new Error('No authentication token'));
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders?status=${status}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 401) {
        window.location.href = '/login';
        reject(new Error('Unauthorized'));
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return response.json();
    })
    .then(resolve)
    .catch(reject);
  });
}
