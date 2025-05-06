"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner"; // Correct Sonner import
import { createOrder } from "@/lib/api/orders";
import { OrderRequest, OrderItemRequest } from "@/lib/types/order";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const {
    user,
    token,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuthStore();
  const router = useRouter();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  // Pre-fill name if user data is available and not loading
  React.useEffect(() => {
    if (user && !isAuthLoading) {
      setName(user.name || "");
    }
  }, [user, isAuthLoading]);

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuthLoading) {
      toast.warning("Please wait", {
        description: "Verifying authentication...",
      });
      return;
    }
    if (!isAuthenticated || !token || !user) {
      toast.error("Authentication Error", {
        description: "Please log in to place an order.",
      });
      router.push("/login?redirect=/checkout");
      return;
    }
    if (items.length === 0) {
      toast.error("Empty Cart", {
        description: "Cannot place an order with an empty cart.",
      });
      router.push("/cart");
      return;
    }
    if (!address.trim() || !name.trim()) {
      toast.error("Missing Information", {
        description: "Please enter your full name and shipping address.",
      });
      return;
    }

    setIsPlacingOrder(true);

    const orderItems: OrderItemRequest[] = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderRequest: OrderRequest = {
      userId: user.id,
      shippingAddress: address,
      orderItems: orderItems,
      totalAmount: getTotalPrice(),
      paymentMethod: "COD",
    };

    try {
      console.log("Placing order with data:", orderRequest);
      const createdOrder = await createOrder(orderRequest, token);

      if (!createdOrder) {
        throw new Error("Order placement failed. Please try again.");
      }

      toast.success("Order Placed Successfully!", {
        description: "Thank you for your purchase.",
      });
      clearCart();
      router.push("/");
    } catch (error: any) {
      console.error("Failed to place order:", error);
      const errorMsg =
        error?.response?.data?.message ||
        error.message ||
        "Could not place your order. Please try again.";
      toast.error("Order Failed", {
        description: errorMsg,
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Redirect if cart is empty and not loading auth state
  React.useEffect(() => {
    if (!isAuthLoading && items.length === 0) {
      toast.info("Cart Empty", {
        description: "Redirecting to shopping page.",
      });
      router.replace("/");
    }
  }, [items, isAuthLoading, router]);

  // Show loading state if auth is loading or cart is empty
  if (isAuthLoading || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading checkout...</p>
        <Toaster richColors position="top-right" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Shipping Information */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Shipping Address</Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full shipping address"
              required
              rows={4}
            />
          </div>
          <h2 className="text-xl font-semibold mb-4 mt-8">Payment Method</h2>
          <div className="border rounded-md p-4 bg-muted">
            <p className="font-medium">Cash on Delivery (COD)</p>
            <p className="text-sm text-muted-foreground">
              Pay when your order arrives.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 shadow-sm sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="flex-1 mr-2 truncate">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <Button
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPlacingOrder || isAuthLoading}
            >
              {isPlacingOrder ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
}
