"use client";

import React from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { toast, Toaster } from "sonner"; // Correct import for Sonner

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } =
    useCartStore();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
      if (newQuantity === 0) {
        toast.success("Item Removed", {
          description: "Item quantity set to zero and removed from cart.",
        });
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Toaster richColors position="top-right" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center border rounded-lg p-4 shadow-sm gap-4"
            >
              <Image
                src={item.productImages?.[0]?.imageUrl || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded object-cover flex-shrink-0"
              />
              <div className="flex-grow text-center sm:text-left">
                <Link
                  href={`/products/${item.id}`}
                  className="font-medium hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 mx-4 flex-shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    handleQuantityChange(item.id, isNaN(val) ? 0 : val);
                  }}
                  className="h-8 w-14 text-center"
                  min={0}
                  aria-label="Quantity"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-semibold w-20 text-right flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto sm:ml-4 text-red-500 hover:text-red-700 flex-shrink-0"
                onClick={() => {
                  removeItem(item.id);
                  toast.success("Item Removed", {
                    description: `${item.name} removed from cart.`,
                  });
                }}
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 shadow-sm sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
