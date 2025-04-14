import { getAllProducts, getAllCategories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Filter, Search, ShoppingCart } from "lucide-react";
import { Product, Category } from "@/types";

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-lg">Filters</h2>
              <Filter className="h-5 w-5 text-gray-500" />
            </div>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category: Category) => (
                  <li key={category.id}>
                    <Link 
                      href={`/products?category=${category.id}`}
                      className="text-gray-600 hover:text-primary text-sm flex items-center"
                    >
                      <span className="block w-4 h-4 border rounded-sm mr-2"></span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex border rounded-md">
                  <span className="bg-gray-50 text-gray-500 px-2 py-1 text-sm border-r">$</span>
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full p-1 text-sm outline-none"
                  />
                </div>
                <div className="flex border rounded-md">
                  <span className="bg-gray-50 text-gray-500 px-2 py-1 text-sm border-r">$</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full p-1 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
            
            {/* Sort */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Sort By</h3>
              <select className="w-full p-2 border rounded-md text-sm">
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
        
        {/* Product grid */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 border rounded-lg focus:outline-none focus:ring focus:border-primary"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="h-48 relative">
                    <Image
                      src={product.image || "https://placehold.co/400x300/e2e8f0/a1a1aa?text=Product"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <Button size="sm" variant="outline" className="rounded-full p-2 h-auto">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 