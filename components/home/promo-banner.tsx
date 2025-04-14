import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Summer Sale - Up to 50% Off</h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl">
            Discover amazing deals on our summer collection. Limited time offer!
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/sale">Shop the Sale</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 