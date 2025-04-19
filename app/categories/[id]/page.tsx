import { getCategoryById, getProductsByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = getCategoryById(params.id);
  
  if (!category) {
    notFound();
  }
  
  const products = getProductsByCategory(params.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/categories" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-600 mt-2">{category.description}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
} 