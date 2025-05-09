import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartResponse } from '@/lib/types/cart';
import * as cartApi from '@/lib/api/cart';
import { useAuthStore } from './authStore';

interface CartStore {
  items: CartItem[];
  userId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeCart: (userId: string) => Promise<void>;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<string>;

  // Utility functions
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      userId: null,
      isLoading: false,
      error: null,

      initializeCart: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const cart = await cartApi.getUserCart(userId);
          set({ items: cart.items, userId, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to initialize cart', isLoading: false });
        }
      },

      addItem: async (item: CartItem) => {
        const userId = useAuthStore.getState().user?.id;
        console.log(userId);
        if (!userId) {
          set({ error: 'User not authenticated' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const updatedCart = await cartApi.addItemToCart(userId, item.productId, item.quantity);
          set({ items: updatedCart.items, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to add item to cart', isLoading: false });
        }
      },

      removeItem: async (itemId: string) => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) {
          set({ error: 'User not authenticated' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await cartApi.removeCartItem(userId, itemId);
          const items = get().items.filter(item => item.id !== itemId);
          set({ items, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to remove item from cart', isLoading: false });
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) {
          set({ error: 'User not authenticated' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const updatedCart = await cartApi.updateCartItem(userId, itemId, quantity);
          set({ items: updatedCart.items, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to update item quantity', isLoading: false });
        }
      },

      clearCart: async () => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) {
          set({ error: 'User not authenticated' });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          await cartApi.clearCart(userId);
          set({ items: [], isLoading: false });
        } catch (error) {
          set({ error: 'Failed to clear cart', isLoading: false });
        }
      },

      checkout: async () => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) {
          throw new Error('User not authenticated');
        }

        set({ isLoading: true, error: null });
        try {
          const orderId = await cartApi.checkoutCart(userId);
          set({ items: [], isLoading: false });
          return orderId;
        } catch (error) {
          set({ error: 'Failed to checkout cart', isLoading: false });
          throw error;
        }
      },

      // Utility functions
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, userId: state.userId }),
    }
  )
);

