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
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (stock > 0) {
      addItem(product);
      toast.success(`${name} added to cart`);
    }
  };

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden flex flex-col">
      {featured && (
        <div className="absolute top-0 left-0 z-10 m-2">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Featured
          </span>
        </div>
      )}
      
      <div className="aspect-square overflow-hidden relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={toggleWishlist}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        
        <Link href={`/products/${id}`}>
          {imageError ? (
            <div className="flex items-center justify-center h-full w-full bg-gray-100">
              <ImageIcon className="h-16 w-16 text-gray-400" />
            </div>
          ) : (
            <Image
              src={images?.[0] || "/placeholder-product.png"}
              alt={name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              width={300}
              height={300}
              onError={() => setImageError(true)}
            />
          )}
        </Link>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <Link href={`/products/${id}`} className="flex-grow">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        </Link>
        
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">${price.toFixed(2)}</p>
          <Button
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            disabled={stock === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {stock === 0 ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
} 