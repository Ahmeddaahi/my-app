"use client";

import { useState } from "react";
import { getProductById, getProductsByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, BarChart2, Check, Shield, Star } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// This component handles the client-side rendering of the product page
export default function ProductPageWrapper({ params }: { params: { id: string } }) {
  return <ProductPage id={params.id} />;
}

// The main product page component
function ProductPage({ id }: { id: string }) {
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  
  // If product not found, show 404 page
  if (!product) {
    notFound();
  }
  
  // Get related products (same category)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      userId: "user1",
      userName: "Jane Smith",
      rating: 5,
      comment: "Absolutely love this product! The quality is outstanding and it fits perfectly. Highly recommend!",
      date: "2023-12-15"
    },
    {
      id: "2",
      userId: "user2",
      userName: "John Davis",
      rating: 4,
      comment: "Great product for the price. Shipping was fast and the item matched the description exactly.",
      date: "2023-11-28"
    }
  ];
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your ${rating}-star review!`);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images Gallery */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square bg-white rounded-lg overflow-hidden border">
            <Image
              src={product.images[selectedImage] || "/placeholder-product.png"}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-auto py-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 border rounded-md overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          {/* Display rating stars */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < 4.5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(26 reviews)</span>
          </div>
          
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
      
      {/* Reviews Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {/* Reviews list */}
        <div className="space-y-6 mb-8">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center mb-2">
                <h3 className="font-medium mr-2">{review.userName}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-auto text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
        
        {/* Add review form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block text-sm font-medium mb-2">Your Review</label>
              <textarea
                id="review"
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
              ></textarea>
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      </div>
      
      {/* Related Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        
        {relatedProducts.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {relatedProducts.map((relatedProduct) => (
                <CarouselItem key={relatedProduct.id} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <ProductCard {...relatedProduct} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
} 