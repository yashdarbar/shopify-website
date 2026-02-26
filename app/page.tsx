import { Suspense } from 'react';
import { HeroSection } from '@/components/cms/HeroSection';
import { TrustBadges } from '@/components/cms/TrustBadges';
import { Testimonials } from '@/components/cms/Testimonials';
import { FeaturedCollections } from '@/components/cms/FeaturedCollections';
import { Marquee } from '@/components/ui/Marquee';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import {
  getMockHeroBanners,
  getMockTrustBadges,
  getMockTestimonials,
  getMockFeaturedCollections,
} from '@/lib/mock-data';

// Loading skeleton for products
function ProductsSkeleton() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-cream rounded animate-pulse" />
          <div className="h-6 w-24 bg-cream rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-square bg-cream animate-pulse" />
              <div className="p-4">
                <div className="h-4 w-3/4 bg-cream rounded animate-pulse mb-2" />
                <div className="h-6 w-1/2 bg-cream rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  // Get CMS data
  const heroBanners = getMockHeroBanners();
  const trustBadges = getMockTrustBadges();
  const testimonials = getMockTestimonials(true);
  const featuredCollections = getMockFeaturedCollections(4);

  return (
    <>
      {/* Hero Section with Banner Carousel */}
      <HeroSection banners={heroBanners} />

      {/* Scrolling Marquee */}
      <Marquee
        text="Free Shipping on Orders Over Rs. 499 • 100% Natural Ingredients • No Preservatives • No Added Sugar • Handcrafted with Love"
      />

      {/* Trust Badges */}
      <TrustBadges badges={trustBadges} />

      {/* Featured Collections */}
      <FeaturedCollections
        collections={featuredCollections}
        title="Shop by Category"
        subtitle="Explore our curated healthy snack collections"
      />

      {/* Best Sellers Products */}
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts title="Best Sellers" count={8} />
      </Suspense>

      {/* Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* New Arrivals Products */}
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts title="New Arrivals" count={4} />
      </Suspense>
    </>
  );
}
