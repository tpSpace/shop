export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
  productImages?: Array<{
    imageUrl: string;
    isDefault: boolean;
  }>;
}

export interface CartResponse {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
} 