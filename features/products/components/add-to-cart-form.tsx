"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Product } from "@/lib/types";
import { ShoppingCart, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Use Sonner for toasts

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(0); // Allow clearing the input
    }
  };

  const handleAddToCart = () => {
    if (isLoading) {
      toast.warning("Please wait", {
        description: "Checking authentication status...",
      });
      return;
    }

    if (!isAuthenticated) {
      toast.error("Login Required", {
        description: (
          <>
            Please log in to add items to your cart.{" "}
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-blue-600"
              onClick={() => router.push("/login")}
            >
              <LogIn className="mr-1 h-4 w-4" /> Login
            </Button>
          </>
        ),
      });
      return;
    }

    if (quantity <= 0) {
      toast.error("Invalid Quantity", {
        description: "Please enter a quantity greater than zero.",
      });
      return;
    }

    addItem(product, quantity);
    toast.success("Added to Cart", {
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="flex items-center space-x-4 my-6">
      <label htmlFor={`quantity-${product.id}`} className="font-medium">
        Quantity:
      </label>
      <Input
        type="number"
        id={`quantity-${product.id}`}
        value={quantity === 0 ? "" : quantity}
        onChange={handleQuantityChange}
        min={1}
        className="w-20 h-10"
        aria-label="Quantity"
      />
      <Button
        size="lg"
        onClick={handleAddToCart}
        className="flex-grow sm:flex-grow-0"
        disabled={isLoading}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading ? "Checking..." : "Add to Cart"}
      </Button>
    </div>
  );
}
