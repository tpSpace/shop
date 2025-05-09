"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { Button } from '@/components/ui/button';
import { fetchOrders } from '@/lib/api/orders';
import { useEffect, useState } from 'react';
import type { CartItem } from '@/lib/types/cart';
import type { Order } from '@/lib/types/order';

function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <div className="text-sm text-muted-foreground">
            {new Date(order.orderDate).toLocaleDateString()}
          </div>
        </div>
        <div className={`text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
          {order.orderStatus}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Items:</p>
            <ul className="list-disc pl-4">
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Total: ${order.totalAmount}</p>
            <p className="text-sm text-muted-foreground">
              Shipping to: {order.shippingAddress}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'processing': return 'text-orange-500';
    case 'shipped': return 'text-blue-500';
    case 'delivered': return 'text-green-500';
    case 'cancelled': return 'text-red-500';
    default: return 'text-muted-foreground';
  }
}

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: pendingOrders = [], isLoading: pendingLoading, error: pendingError } = useQuery({
    queryKey: ['orders', 'pending'],
    queryFn: () => fetchOrders('pending'),
    enabled: mounted,
  });

  const { data: shippedOrders = [], isLoading: shippedLoading, error: shippedError } = useQuery({
    queryKey: ['orders', 'shipped'],
    queryFn: () => fetchOrders('shipped'),
    enabled: mounted,
  });

  const { data: deliveredOrders = [], isLoading: deliveredLoading, error: deliveredError } = useQuery({
    queryKey: ['orders', 'delivered'],
    queryFn: () => fetchOrders('delivered'),
    enabled: mounted,
  });

  if (!mounted) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
        </div>
      </div>
    );
  }

  if (pendingError || shippedError || deliveredError) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load orders. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-6">
          <TabsTrigger value="pending">Pending ({pendingOrders?.length || 0})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({shippedOrders?.length || 0})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({deliveredOrders?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          ) : (
            pendingOrders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </TabsContent>

        <TabsContent value="shipped">
          {shippedLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          ) : (
            shippedOrders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </TabsContent>

        <TabsContent value="delivered">
          {deliveredLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[150px] w-full" />
              <Skeleton className="h-[150px] w-full" />
            </div>
          ) : (
            deliveredOrders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function CartItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={item.image || ''}
          alt={item.productName}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{item.productName}</h3>
        <p className="text-sm text-muted-foreground">${item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </Button>
    </div>
  );
}
