import { TrustBadge } from '@/lib/mock-data/site-content';
import { Leaf, ShieldCheck, Sprout, Dumbbell, Heart, Star, Award, Truck } from 'lucide-react';

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf,
  ShieldCheck,
  Sprout,
  Dumbbell,
  Heart,
  Star,
  Award,
  Truck,
};

interface TrustBadgesProps {
  badges: TrustBadge[];
}

export function TrustBadges({ badges }: TrustBadgesProps) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => {
            const IconComponent = iconMap[badge.icon] || Leaf;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-surface border border-border hover:border-accent transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                  <IconComponent className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-semibold font-heading text-primary text-lg">
                  {badge.title}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
