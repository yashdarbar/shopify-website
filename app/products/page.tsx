import { Metadata } from 'next';
import { getMockProducts, getMockProductsByTag } from '@/lib/mock-data';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';

export const metadata: Metadata = {
  title: 'All Products | NutriBites',
  description: 'Browse our complete collection of healthy snacks. Protein snacks, millet munchies, guilt-free sweets, and more.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    tag?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  let products = getMockProducts();

  // Filter by tag if provided
  if (params.tag) {
    products = getMockProductsByTag(params.tag);
  }

  // Filter by price range
  if (params.minPrice || params.maxPrice) {
    const min = params.minPrice ? parseFloat(params.minPrice) : 0;
    const max = params.maxPrice ? parseFloat(params.maxPrice) : Infinity;
    products = products.filter(p => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      return price >= min && price <= max;
    });
  }

  // Sort products
  if (params.sort) {
    switch (params.sort) {
      case 'price-asc':
        products = [...products].sort((a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        products = [...products].sort((a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
        );
        break;
      case 'name-asc':
        products = [...products].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        products = [...products].sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary uppercase tracking-wide">
            All Products
          </h1>
          <p className="mt-2 text-muted">
            Discover our complete range of healthy, delicious snacks
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              currentTag={params.tag}
              currentSort={params.sort}
              currentMinPrice={params.minPrice}
              currentMaxPrice={params.maxPrice}
            />
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-16">
                <p className="text-primary font-medium mb-2">No products found</p>
                <p className="text-muted text-sm">
                  Try adjusting your filters or browse all products
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
