import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getMockCollections } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Collections | NutriBites',
  description: 'Browse our curated collections of healthy snacks. From protein snacks to guilt-free sweets, find the perfect treats for you.',
};

export default function CollectionsPage() {
  const collections = getMockCollections();

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary">
            Our Collections
          </h1>
          <p className="mt-2 text-brown-light">
            Explore our curated range of healthy, delicious snacks
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h2 className="text-white font-bold font-heading text-2xl mb-2">
                  {collection.title}
                </h2>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">
                    {collection.products.length} products
                  </span>
                  <span className="flex items-center gap-1 text-accent font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
