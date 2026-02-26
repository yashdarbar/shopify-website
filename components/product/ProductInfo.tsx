'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, ShopifyProductVariant } from '@/lib/shopify/types';
import { Button } from '@/components/ui/Button';
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

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart, setLoading, isLoading } = useCartStore();

  const price = selectedVariant.price;
  const comparePrice = selectedVariant.compareAtPrice;
  const hasDiscount = comparePrice && parseFloat(comparePrice.amount) > parseFloat(price.amount);
  const discountPercentage = hasDiscount
    ? Math.round(
        ((parseFloat(comparePrice.amount) - parseFloat(price.amount)) /
          parseFloat(comparePrice.amount)) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    setLoading(true);
    // Add item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
    setLoading(false);
    openCart();
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const hasVariants = product.variants.length > 1;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-primary">
          {product.title}
        </h1>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xl text-brown-light line-through">
                {formatPrice(comparePrice.amount, comparePrice.currencyCode)}
              </span>
              <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-semibold rounded">
                {discountPercentage}% OFF
              </span>
            </>
          )}
        </div>

        {/* Availability */}
        <p className="mt-2 text-sm">
          {product.availableForSale ? (
            <span className="text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-red-500 font-medium">Out of Stock</span>
          )}
        </p>
      </div>

      {/* Short Description */}
      <p className="text-brown-light">{product.description}</p>

      {/* Variant Selector */}
      {hasVariants && (
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            {product.options[0]?.name || 'Option'}
          </label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.availableForSale}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedVariant.id === variant.id
                    ? 'border-primary bg-primary text-white'
                    : variant.availableForSale
                    ? 'border-brown-light/30 hover:border-primary text-primary'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-brown-light/30 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-3 hover:bg-cream rounded-l-lg disabled:opacity-50 transition-colors"
            >
              <Minus className="h-4 w-4 text-primary" />
            </button>
            <span className="px-4 py-2 text-lg font-medium text-primary min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
              className="p-3 hover:bg-cream rounded-r-lg disabled:opacity-50 transition-colors"
            >
              <Plus className="h-4 w-4 text-primary" />
            </button>
          </div>
          <span className="text-sm text-brown-light">
            Max 10 per order
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!product.availableForSale || isLoading}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
        <button
          className="p-3 border border-brown-light/30 rounded-lg hover:bg-cream transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="h-6 w-6 text-primary" />
        </button>
        <button
          className="p-3 border border-brown-light/30 rounded-lg hover:bg-cream transition-colors"
          aria-label="Share product"
        >
          <Share2 className="h-6 w-6 text-primary" />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream">
        <div className="text-center">
          <Truck className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-brown-light">Free Shipping</p>
          <p className="text-xs text-primary font-medium">Above Rs. 499</p>
        </div>
        <div className="text-center">
          <Shield className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-brown-light">100% Natural</p>
          <p className="text-xs text-primary font-medium">No Preservatives</p>
        </div>
        <div className="text-center">
          <RotateCcw className="h-6 w-6 mx-auto text-primary mb-2" />
          <p className="text-xs text-brown-light">Easy Returns</p>
          <p className="text-xs text-primary font-medium">7 Days Policy</p>
        </div>
      </div>
    </div>
  );
}
