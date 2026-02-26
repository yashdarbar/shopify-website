import Link from 'next/link';
import { getCollections, isShopifyConfigured } from '@/lib/shopify';

export async function CategoriesSection() {
  // Skip if Shopify is not configured
  if (!isShopifyConfigured()) {
    return null;
  }

  let collections = [];

  try {
    collections = await getCollections(6);
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return null;
  }

  if (collections.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Shop by Category</h2>
          <p className="mt-2 text-brown-light">Browse our curated collections</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-primary/5"
            >
              {/* Background Image or Gradient */}
              {collection.image ? (
                <img
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/40 transition-colors" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-lg md:text-xl font-bold text-center">
                  {collection.title}
                </h3>
                <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
