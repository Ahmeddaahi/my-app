import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center py-20 md:py-32 md:items-start md:text-left md:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Discover Your Style
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-lg">
            Find the perfect pieces to express yourself. Quality fashion that speaks to your individual style.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="text-base" variant="secondary">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-transparent hover:bg-white/10">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 