import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductByHandle, getProducts, isShopifyConfigured, Product } from '@/lib/shopify';
import { getMockProductByHandle, getMockProducts } from '@/lib/mock-data';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductGrid } from '@/components/product/ProductGrid';
import { BackButton } from '@/components/ui/BackButton';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = getMockProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;

  // Try Shopify first, then mock data
  let product = null;
  if (isShopifyConfigured()) {
    product = await getProductByHandle(handle);
  }
  if (!product) {
    product = getMockProductByHandle(handle);
  }

  if (!product) {
    return {
      title: 'Product Not Found | Welwach',
    };
  }

  return {
    title: `${product.title} | Welwach`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  // Try Shopify first, then mock data
  let product = null;
  if (isShopifyConfigured()) {
    product = await getProductByHandle(handle);
  }
  if (!product) {
    product = getMockProductByHandle(handle);
  }

  if (!product) {
    notFound();
  }

  // Get related products (same tags)
  let allProducts: Product[] = [];
  if (isShopifyConfigured()) {
    allProducts = await getProducts();
  }
  if (allProducts.length === 0) {
    allProducts = getMockProducts();
  }
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        p.tags.some((tag) => product.tags.includes(tag))
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton />
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted">
                  No image available
                </div>
              )}

              {/* Discount badge */}
              {product.variants[0]?.compareAtPrice && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-sm font-bold rounded-full">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnail Images (if multiple) */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 flex-shrink-0 bg-surface rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Description */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold font-heading text-primary mb-4">
            Product Details
          </h2>
          <div
            className="prose prose-primary max-w-none text-muted"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/products?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-surface text-primary text-sm rounded-full hover:bg-accent hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold font-heading text-primary mb-8">
              You Might Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
