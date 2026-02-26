import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getMockFeaturedProducts, getMockBestsellers } from '@/lib/mock-data';

interface FeaturedProductsProps {
  title?: string;
  count?: number;
  showBestsellers?: boolean;
}

export function FeaturedProducts({
  title = 'Featured Products',
  count = 8,
  showBestsellers = false,
}: FeaturedProductsProps) {
  // Get products from mock data
  const products = showBestsellers
    ? getMockBestsellers().slice(0, count)
    : getMockFeaturedProducts(count);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">{title}</h2>
          <Link
            href="/products"
            className="flex items-center gap-2 text-accent hover:text-primary transition-colors font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
