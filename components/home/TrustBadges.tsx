import { Truck, Shield, RefreshCw, HeadphonesIcon } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $50',
  },
  {
    icon: Shield,
    title: '100% Secure',
    description: 'Safe payment methods',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: "We're here to help",
  },
];

export function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center"
            >
              <div className="p-3 bg-accent/10 rounded-full mb-3">
                <badge.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-primary">{badge.title}</h3>
              <p className="text-sm text-muted">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
