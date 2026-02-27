'use client';

import Image from 'next/image';
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge) => {
            const IconComponent = iconMap[badge.icon] || Leaf;
            return (
              <div
                key={badge.id}
                className="relative overflow-hidden rounded-xl h-44 md:h-52 group cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={badge.imageUrl}
                  alt={badge.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  {/* Icon Circle */}
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base md:text-lg font-heading text-white leading-tight">
                    {badge.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-white/80 mt-1 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
