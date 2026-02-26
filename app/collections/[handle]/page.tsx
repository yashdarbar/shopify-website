import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMockCollectionByHandle, getMockCollections } from '@/lib/mock-data';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ArrowLeft } from 'lucide-react';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

// Generate static paths for all collections
export async function generateStaticParams() {
  const collections = getMockCollections();
  return collections.map((collection) => ({
    handle: collection.handle,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = getMockCollectionByHandle(handle);

  if (!collection) {
    return {
      title: 'Collection Not Found | NutriBites',
    };
  }

  return {
    title: `${collection.title} | NutriBites`,
    description: collection.description,
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: collection.image ? [collection.image.url] : [],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = getMockCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Collection Header */}
      <div className="relative bg-primary text-white">
        {/* Background Image */}
        {collection.image && (
          <div className="absolute inset-0">
            <Image
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              fill
              className="object-cover opacity-30"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            All Collections
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading">
            {collection.title}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-lg">
            {collection.description}
          </p>
          <p className="mt-4 text-accent font-medium">
            {collection.products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {collection.products.length > 0 ? (
          <ProductGrid products={collection.products} />
        ) : (
          <div className="text-center py-16">
            <p className="text-primary font-medium mb-2">No products in this collection</p>
            <p className="text-muted text-sm">
              Check back soon for new additions
            </p>
            <Link
              href="/products"
              className="inline-block mt-4 text-accent hover:text-primary font-medium transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
