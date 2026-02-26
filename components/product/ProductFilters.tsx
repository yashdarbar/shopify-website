'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

// Available filter tags
const FILTER_TAGS = [
  { label: 'All', value: '' },
  { label: 'Bestseller', value: 'Bestseller' },
  { label: 'Protein', value: 'Protein' },
  { label: 'Millet', value: 'Millet' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Gluten-Free', value: 'Gluten-Free' },
  { label: 'No Sugar', value: 'No Sugar' },
  { label: 'Baked', value: 'Baked' },
  { label: 'Gift', value: 'Gift' },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: '' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
  { label: 'Name: Z-A', value: 'name-desc' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: '', max: '' },
  { label: 'Under Rs. 200', min: '', max: '200' },
  { label: 'Rs. 200 - Rs. 400', min: '200', max: '400' },
  { label: 'Rs. 400 - Rs. 800', min: '400', max: '800' },
  { label: 'Over Rs. 800', min: '800', max: '' },
];

interface ProductFiltersProps {
  currentTag?: string;
  currentSort?: string;
  currentMinPrice?: string;
  currentMaxPrice?: string;
}

export function ProductFilters({
  currentTag = '',
  currentSort = '',
  currentMinPrice = '',
  currentMaxPrice = '',
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = currentTag || currentSort || currentMinPrice || currentMaxPrice;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold text-primary mb-3">Sort By</h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="w-full px-3 py-2 border border-border rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category/Tags */}
      <div>
        <h3 className="font-semibold text-primary mb-3">Category</h3>
        <div className="space-y-2">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => updateFilters({ tag: tag.value })}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                currentTag === tag.value
                  ? 'bg-primary text-white'
                  : 'text-primary hover:bg-surface'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-primary mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => {
            const isActive =
              currentMinPrice === range.min && currentMaxPrice === range.max;
            return (
              <button
                key={index}
                onClick={() =>
                  updateFilters({ minPrice: range.min, maxPrice: range.max })
                }
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-primary hover:bg-surface'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2 text-sm text-accent hover:text-primary transition-colors font-medium"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-heading text-primary flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </h2>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg mb-4"
      >
        <Filter className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="w-2 h-2 rounded-full bg-accent" />
        )}
      </button>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 max-w-full bg-white z-50 shadow-xl overflow-y-auto lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold font-heading text-primary">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-surface rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-primary" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        </>
      )}
    </>
  );
}
