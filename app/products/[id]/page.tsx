import { getProductById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, BarChart2, Check, Shield } from "lucide-react";

// Define params as Promise to fix the Vercel deployment error
// Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'
type PageParams = Promise<{ id: string }>;

export default async function ProductPage({ params }: { params: PageParams }) {
  const { id } = await params;
  const product = getProductById(id);
  
  // If product not found, show 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-white rounded-lg overflow-hidden border">
            <Image
              src={product.images[0] || "https://placehold.co/800x800?text=Product"}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Details</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>SKU: {product.sku}</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Availability: {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</span>
              </li>
            </ul>
          </div>
          
          <div className="flex space-x-4 mb-8">
            <Button className="flex-1" disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-sm text-gray-500">All major credit cards accepted</p>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart2 className="h-5 w-5 text-primary mr-3" />
              <div>
                <h3 className="font-medium">Quality Guarantee</h3>
                <p className="text-sm text-gray-500">30-day satisfaction guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 