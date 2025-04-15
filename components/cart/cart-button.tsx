"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export function CartButton() {
  const { state } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // For client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
      </Button>
    );
  }
  
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
} 