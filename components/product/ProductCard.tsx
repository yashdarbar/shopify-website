'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/shopify/types';
import { useCartStore } from '@/lib/store/cart';

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setLoading, openCart } = useCartStore();

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

    // For mock data, we'll just add to local cart store
    // When Shopify is connected, this will use the actual API
    setLoading(true);
    try {
      // Add item to local cart (mock implementation)
      addItem(product, product.variants[0]);
      openCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-cream overflow-hidden">
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-brown-light">
            No image
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-accent text-white text-xs font-bold rounded-full">
            -{discountPercentage}%
          </span>
        )}

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 p-3 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-dark"
          aria-label="Add to cart"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-primary line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-brown-light line-through">
              {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
            </span>
          )}
        </div>
        {!product.availableForSale && (
          <span className="inline-block mt-2 text-xs text-red-500 font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
