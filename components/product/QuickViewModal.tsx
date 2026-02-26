'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuickViewStore } from '@/lib/store/quickView';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/Button';
import type { ShopifyProductVariant } from '@/lib/shopify/types';

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

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-accent text-accent" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="h-4 w-4 text-border" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-accent text-accent" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-border" />
        ))}
      </div>
      <span className="text-sm text-muted">{rating.toFixed(1)} ({reviewCount} reviews)</span>
    </div>
  );
}

export function QuickViewModal() {
  const { isOpen, product, closeQuickView } = useQuickViewStore();
  const { addItem, setLoading, openCart } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0] || null);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeQuickView]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const price = selectedVariant?.price || product.priceRange.minVariantPrice;
  const comparePrice = selectedVariant?.compareAtPrice;
  const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setLoading(true);
    try {
      for (let i = 0; i < quantity; i++) {
        addItem(product, selectedVariant);
      }
      closeQuickView();
      openCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeQuickView}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-surface transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-primary" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-surface rounded-lg overflow-hidden">
              {product.images[currentImageIndex] ? (
                <Image
                  src={product.images[currentImageIndex].url}
                  alt={product.images[currentImageIndex].altText || product.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-muted">
                  No image
                </div>
              )}

              {/* Image navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-primary" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      index === currentImageIndex
                        ? 'border-accent'
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold font-heading text-primary">
              {product.title}
            </h2>

            {/* Rating */}
            {product.rating && product.reviewCount && (
              <div className="mt-2">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-accent">
                {formatPrice(price.amount, price.currencyCode)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted line-through">
                  {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-muted leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-primary mb-2">
                  {product.options[0]?.name || 'Variant'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                        selectedVariant?.id === variant.id
                          ? 'border-accent bg-accent text-white'
                          : 'border-border bg-white text-primary hover:border-accent'
                      }`}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-primary mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-border rounded-md hover:border-accent transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4 text-primary" />
                </button>
                <span className="w-12 text-center font-medium text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-border rounded-md hover:border-accent transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-6 space-y-3">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
                disabled={!product.availableForSale}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>

              <Link
                href={`/products/${product.handle}`}
                onClick={closeQuickView}
                className="block text-center text-sm text-accent hover:text-accent-dark transition-colors"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
