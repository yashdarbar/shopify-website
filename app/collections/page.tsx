import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getMockCollections } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | Welwach',
  description: 'Browse our curated collections of healthy snacks. From protein snacks to guilt-free sweets, find the perfect treats for you.',
};

// Bento grid configuration for each collection
const BENTO_CONFIG: Record<string, { gridClass: string; type: 'hero' | 'tall' | 'wide' | 'standard' }> = {
  'bestsellers': { gridClass: 'md:col-span-2 md:row-span-2', type: 'hero' },
  'protein-snacks': { gridClass: 'md:row-span-2', type: 'tall' },
  'millet-munchies': { gridClass: '', type: 'standard' },
  'guilt-free-sweets': { gridClass: '', type: 'standard' },
  'crunchy-namkeen': { gridClass: '', type: 'standard' },
  'gift-hampers': { gridClass: 'md:col-span-2', type: 'wide' },
  'new-arrivals': { gridClass: '', type: 'standard' },
};

// Order collections for optimal bento layout
const BENTO_ORDER = [
  'bestsellers',
  'protein-snacks',
  'millet-munchies',
  'guilt-free-sweets',
  'crunchy-namkeen',
  'gift-hampers',
  'new-arrivals',
];

export default function CollectionsPage() {
  const allCollections = getMockCollections();

  // Sort collections according to bento order
  const collections = [...allCollections].sort((a, b) => {
    const orderA = BENTO_ORDER.indexOf(a.handle);
    const orderB = BENTO_ORDER.indexOf(b.handle);
    return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary uppercase tracking-wide">
            Our Collections
          </h1>
          <p className="mt-2 text-muted">
            Explore our curated range of healthy, delicious snacks
          </p>
        </div>
      </div>

      {/* Bento Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[200px]">
          {collections.map((collection) => {
            const config = BENTO_CONFIG[collection.handle] || { gridClass: '', type: 'standard' as const };
            const isHero = config.type === 'hero';
            const isTall = config.type === 'tall';

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className={`group relative rounded-2xl overflow-hidden bg-surface ${config.gridClass}`}
              >
                {/* Background Image */}
                {collection.image && (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <h2 className={`text-white font-bold font-heading leading-tight ${
                    isHero ? 'text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3' :
                    isTall ? 'text-xl md:text-2xl mb-2' :
                    'text-lg md:text-xl mb-1'
                  }`}>
                    {collection.title}
                  </h2>
                  <p className={`text-white/80 line-clamp-2 ${
                    isHero ? 'text-sm md:text-base mb-4' :
                    isTall ? 'text-sm mb-3' :
                    'text-xs md:text-sm mb-2'
                  }`}>
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-white/70 ${isHero ? 'text-sm' : 'text-xs'}`}>
                      {collection.products.length} products
                    </span>
                    <span className="flex items-center gap-1 text-accent font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
