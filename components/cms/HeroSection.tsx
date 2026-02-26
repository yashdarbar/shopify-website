'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HeroBanner } from '@/lib/mock-data/site-content';

interface HeroSectionProps {
  banners: HeroBanner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (banners.length === 0) {
    return <FallbackHero />;
  }

  const currentBanner = banners[currentIndex];
  const isLightText = currentBanner.textColor === 'light';

  return (
    <section className="relative overflow-hidden">
      {/* Banner slides */}
      <div className="relative h-[500px] md:h-[600px] lg:h-[650px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundColor: banner.backgroundColor }}
          >
            {/* Background Image */}
            {banner.backgroundImage && (
              <Image
                src={banner.backgroundImage}
                alt={banner.headline}
                fill
                className="object-cover"
                priority={index === 0}
              />
            )}
            {/* Overlay for better text readability */}
            <div className={`absolute inset-0 ${
              isLightText ? 'bg-black/30' : 'bg-white/20'
            }`} />

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className={`max-w-xl ${isLightText ? 'text-white' : 'text-primary'}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                  {banner.headline}
                </h1>
                <p className={`mt-4 text-lg md:text-xl ${
                  isLightText ? 'text-white/90' : 'text-muted'
                }`}>
                  {banner.subtext}
                </p>
                <div className="mt-8">
                  <Link href={banner.buttonLink}>
                    <Button
                      size="lg"
                      variant={isLightText ? 'secondary' : 'primary'}
                    >
                      {banner.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors ${
                isLightText
                  ? 'bg-white/20 hover:bg-white/40 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-primary'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition-colors ${
                isLightText
                  ? 'bg-white/20 hover:bg-white/40 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-primary'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-accent w-8'
                    : isLightText
                    ? 'bg-white/50 hover:bg-white/70'
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Fallback hero when no banners are configured
function FallbackHero() {
  return (
    <section className="relative bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
            Welcome to NutriBites
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-primary leading-tight uppercase tracking-wide">
            Healthy Never Tasted
            <br />
            <span className="text-accent">This Good</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            100% Natural Ingredients | No Preservatives | No Added Sugar
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg">
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
