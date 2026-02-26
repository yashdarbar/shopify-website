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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary uppercase tracking-wide">
            {title}
          </h2>
          <p className="mt-2 text-muted">{subtitle}</p>
        </div>

        {/* Collections Grid - Circular Images */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular Image */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-surface border-2 border-border group-hover:border-accent transition-all duration-300">
                {collection.image && (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="mt-4 font-semibold text-primary group-hover:text-accent transition-colors text-sm md:text-base">
                {collection.title}
              </h3>
              <p className="text-xs text-muted mt-1">
                {collection.products.length} products
              </p>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors uppercase tracking-wider text-sm"
          >
            View All Collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
