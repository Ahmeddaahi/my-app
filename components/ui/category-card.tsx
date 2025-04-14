"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

export function CategoryCard({ id, name, description, image }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/categories/${id}`} className="block">
      <div className="group relative bg-white border rounded-lg overflow-hidden">
        <div className="aspect-square overflow-hidden relative">
          {imageError ? (
            <div className="flex items-center justify-center h-full w-full bg-gray-800">
              <ImageIcon className="h-16 w-16 text-gray-500" />
            </div>
          ) : (
            <Image
              src={image || "/placeholder-category.png"}
              alt={name}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              width={300}
              height={300}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/30 flex items-end p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-90">
            <div className="text-white w-full">
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="mt-1 text-sm line-clamp-2 text-gray-100">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 