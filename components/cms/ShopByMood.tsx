'use client';

import Link from 'next/link';
import {
  Zap,
  Dumbbell,
  Heart,
  PartyPopper,
  Laptop,
  Smile,
  LucideIcon,
} from 'lucide-react';
import type { MoodCategory } from '@/lib/mock-data/site-content';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Dumbbell,
  Heart,
  PartyPopper,
  Laptop,
  Smile,
};

interface ShopByMoodProps {
  categories: MoodCategory[];
}

export function ShopByMood({ categories }: ShopByMoodProps) {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary uppercase tracking-wide">
            Shop By Mood
          </h2>
          <p className="mt-2 text-muted">
            Find the perfect snack for every moment
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Zap;

            return (
              <Link
                key={category.id}
                href={`/products?mood=${category.slug}`}
                className="group flex flex-col items-center p-6 bg-white rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                {/* Icon Circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <Icon
                    className="h-8 w-8 transition-colors duration-300"
                    style={{ color: category.color }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-primary text-center group-hover:text-accent transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="mt-1 text-xs text-muted text-center line-clamp-1">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
