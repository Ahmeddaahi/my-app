import { Truck, CreditCard, RotateCcw, Clock } from "lucide-react";

const features = [
  {
    name: "Free Shipping",
    description: "Free shipping on orders over $50",
    icon: Truck,
  },
  {
    name: "Secure Payments",
    description: "We accept all major credit cards",
    icon: CreditCard,
  },
  {
    name: "Easy Returns",
    description: "30-day return policy",
    icon: RotateCcw,
  },
  {
    name: "24/7 Support",
    description: "Contact us anytime for assistance",
    icon: Clock,
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-start">
              <div className="flex-shrink-0">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 