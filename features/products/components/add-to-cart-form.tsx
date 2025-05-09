"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/lib/store/cartStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    images?: string[];
  };
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading, error } = useCartStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity > product.quantity) {
      toast.error('Not enough stock available');
      return;
    }

    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    try {
      await addItem({
        id: product.id,
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images?.[0]
      });
      
      toast.success('Added to cart successfully');
      setQuantity(1);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-20"
        />
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isLoading || product.quantity === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </div>
      {product.quantity === 0 && (
        <p className="text-sm text-red-500">Out of stock</p>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </form>
  );
}
