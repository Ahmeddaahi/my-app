import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CategoriesSection } from "@/components/home/categories-section";
import { PromoBanner } from "@/components/home/promo-banner";
import { FeatureHighlights } from "@/components/home/feature-highlights";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureHighlights />
      <FeaturedProducts />
      <PromoBanner />
      <CategoriesSection />
    </>
  );
}
