'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  Candy,
  Pizza,
  Citrus,
  Dumbbell,
  PartyPopper,
  Coffee,
  Smile,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import type { MoodCategory } from '@/lib/mock-data/site-content';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Flame,
  Candy,
  Pizza,
  Citrus,
  Dumbbell,
  PartyPopper,
  Coffee,
  Smile,
};

interface ShopByMoodProps {
  categories: MoodCategory[];
}

// Helper to darken a hex color
function darkenColor(hex: string, percent: number = 20): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max((num >> 16) - amt, 0);
  const G = Math.max(((num >> 8) & 0x00ff) - amt, 0);
  const B = Math.max((num & 0x0000ff) - amt, 0);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

export function ShopByMood({ categories }: ShopByMoodProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        ref.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary uppercase tracking-wide">
              Shop By Mood
            </h2>
            <p className="mt-1 text-muted text-sm">
              Find the perfect snack for every craving
            </p>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border transition-all duration-200 ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-border text-border cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border transition-all duration-200 ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-border text-border cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Flame;
            const gradientStart = category.color;
            const gradientEnd = darkenColor(category.color, 25);

            return (
              <Link
                key={category.id}
                href={`/products?mood=${category.slug}`}
                className="group flex-shrink-0 snap-start"
              >
                <div
                  className="relative w-[160px] md:w-[180px] h-[140px] md:h-[160px] rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
                  }}
                >
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    {/* Icon */}
                    <div className="mb-3 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow-md" />
                    </div>

                    {/* Name */}
                    <h3 className="text-white font-bold text-lg md:text-xl tracking-wide text-center drop-shadow-md">
                      {category.name}
                    </h3>

                    {/* Description - Hidden on mobile */}
                    <p className="hidden md:block mt-1 text-white/80 text-xs text-center">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 md:hidden">
          <p className="text-xs text-muted">Swipe to explore more</p>
        </div>
      </div>
    </section>
  );
}
