"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { Product } from "@/lib/data";

export function ProductCard(product: Product) {
  const { id, name, description, price, images, stock, sku, featured = false } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const { addItem } = useCart();
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (stock > 0) {
      addItem(product);
      toast.success(`${name} added to cart`);
    }
  };

  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={isImageError ? "/images/placeholder.jpg" : images[0]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={() => setIsImageError(true)}
            priority={featured}
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-primary">${price.toFixed(2)}</span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                onClick={handleAddToCart}
                disabled={stock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {stock === 0 && (
            <p className="text-red-500 text-sm mt-2">Out of stock</p>
          )}
        </div>
      </div>
    </Link>
  );
} 