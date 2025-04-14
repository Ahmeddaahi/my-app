"use client";

import { useState, useEffect } from "react";
import { CategoryCard } from "@/components/ui/category-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCategories, type Category } from "@/lib/data";

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const loadCategories = async () => {
      try {
        // Add a slight delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        const allCategories = getAllCategories();
        setCategories(allCategories);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
            <p className="mt-2 text-gray-600">Find what you're looking for even faster</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 my-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No categories available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
} 