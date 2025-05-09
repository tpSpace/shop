import { CartItem, CartResponse } from '@/lib/types/cart';
import { useAuthStore } from '../store/authStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const CART_ROUTES = {
  getUserCart: (userId: string) => `${API_URL}/api/v1/cart/${userId}`,
  addItem: (userId: string) => `${API_URL}/api/v1/cart/items/${userId}`,
  updateItem: (userId: string, itemId: string) => `${API_URL}/api/v1/cart/items/${userId}/${itemId}`,
  removeItem: (userId: string, itemId: string) => `${API_URL}/api/v1/cart/items/${userId}/${itemId}`,
  clearCart: (userId: string) => `${API_URL}/api/v1/cart/${userId}`,
  checkout: (userId: string) => `${API_URL}/api/v1/cart/checkout/${userId}`,
};

const getAuthHeaders = () => {
  const token = useAuthStore.getState().jwt;
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export async function getUserCart(userId: string): Promise<CartResponse> {
  const response = await fetch(CART_ROUTES.getUserCart(userId), {
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return response.json();
}

export async function addItemToCart(userId: string, productId: string, quantity: number): Promise<CartResponse> {
  const response = await fetch(CART_ROUTES.addItem(userId), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      productId,
      quantity
    })
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }

  return response.json();
}

export async function updateCartItem(userId: string, itemId: string, quantity: number): Promise<CartResponse> {
  const response = await fetch(CART_ROUTES.updateItem(userId, itemId), {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity })
  });

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
}

export async function removeCartItem(userId: string, itemId: string): Promise<void> {
  const response = await fetch(CART_ROUTES.removeItem(userId, itemId), {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
}

export async function clearCart(userId: string): Promise<void> {
  const response = await fetch(CART_ROUTES.clearCart(userId), {
    method: 'DELETE',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Failed to clear cart');
  }
}

export async function checkoutCart(userId: string): Promise<string> {
  const response = await fetch(CART_ROUTES.checkout(userId), {
    method: 'POST',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error('Failed to checkout cart');
  }

  const { orderId } = await response.json();
  return orderId;
} 