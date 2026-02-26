'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';
import { useCartStore } from '@/lib/store/cart';
import { useQuickViewStore } from '@/lib/store/quickView';

// Format price for display
function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount);
  if (currencyCode === 'INR') {
    return `Rs. ${num.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(num);
}

// Star rating component
function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="h-3.5 w-3.5 fill-accent text-accent" />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-3.5 w-3.5 text-border" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-border" />
        ))}
      </div>
      <span className="text-xs text-muted">({reviewCount})</span>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setLoading, openCart } = useCartStore();
  const { openQuickView } = useQuickViewStore();

  const price = product.priceRange.minVariantPrice;
  const comparePrice = product.variants[0]?.compareAtPrice;
  const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(comparePrice.amount) - parseFloat(price.amount)) /
          parseFloat(comparePrice.amount)) *
          100
      )
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.variants[0]) return;

    setLoading(true);
    try {
      addItem(product, product.variants[0]);
      openCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-white rounded-md overflow-hidden border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted">
            No image
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-bold rounded">
            -{discountPercentage}%
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            className="p-2.5 bg-white text-primary rounded-md shadow-md hover:bg-accent hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-accent text-white rounded-md shadow-md hover:bg-accent-dark transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-primary line-clamp-2 min-h-[2.5rem] group-hover:text-accent transition-colors">
          {product.title}
        </h3>

        {/* Star Rating */}
        {product.rating && product.reviewCount && (
          <div className="mt-1.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted line-through">
              {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
            </span>
          )}
        </div>

        {!product.availableForSale && (
          <span className="inline-block mt-2 text-xs text-error font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
