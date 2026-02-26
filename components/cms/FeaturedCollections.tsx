import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/lib/shopify/types';
import { ArrowRight } from 'lucide-react';

interface FeaturedCollectionsProps {
  collections: Collection[];
  title?: string;
  subtitle?: string;
}

export function FeaturedCollections({
  collections,
  title = 'Shop by Category',
  subtitle = 'Explore our curated collections',
}: FeaturedCollectionsProps) {
  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary">
            {title}
          </h2>
          <p className="mt-2 text-brown-light">{subtitle}</p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream"
            >
              {/* Background Image */}
              {collection.image && (
                <Image
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-bold font-heading text-lg md:text-xl">
                  {collection.title}
                </h3>
                <p className="text-white/80 text-sm mt-1 line-clamp-2 hidden md:block">
                  {collection.products.length} products
                </p>
                <div className="flex items-center gap-1 text-accent mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
