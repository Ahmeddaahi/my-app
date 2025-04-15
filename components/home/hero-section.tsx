"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroSection() {
  return (
    <div className="relative bg-white">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {/* Banner 1 */}
          <CarouselItem>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
              <Image 
                src="/images/banner1.jpg" 
                alt="Banner 1" 
                fill 
                priority
                className="object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-16">
                <div className="max-w-md">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Spring Collection</h1>
                  <p className="text-lg text-white mb-6">Discover our latest arrivals for the new season</p>
                  <Button asChild size="lg">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
          
          {/* Banner 2 */}
          <CarouselItem>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
              <Image 
                src="/images/banner2.jpg" 
                alt="Banner 2" 
                fill 
                className="object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-16">
                <div className="max-w-md">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Quality</h1>
                  <p className="text-lg text-white mb-6">Handcrafted pieces for your wardrobe</p>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/categories">Browse Categories</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
          
          {/* Banner 3 */}
          <CarouselItem>
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
              <Image 
                src="/images/banner3.jpg" 
                alt="Banner 3" 
                fill 
                className="object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 flex flex-col justify-center p-10 md:p-16">
                <div className="max-w-md">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Special Offers</h1>
                  <p className="text-lg text-white mb-6">Up to 50% off on selected items</p>
                  <Button asChild size="lg" variant="default">
                    <Link href="/products?discount=true">Shop Sale</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4 md:left-6" />
        <CarouselNext className="right-4 md:right-6" />
      </Carousel>
    </div>
  );
} 