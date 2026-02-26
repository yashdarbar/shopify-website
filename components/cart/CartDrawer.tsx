'use client';

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, useCartTotal, useLocalCartItems } from '@/lib/store/cart';
import { Button } from '@/components/ui/Button';

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

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading, setLoading, updateQuantity, removeItem } = useCartStore();
  const localItems = useLocalCartItems();
  const total = useCartTotal();

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setLoading(true);
    updateQuantity(itemId, newQuantity);
    setLoading(false);
  };

  const handleRemoveItem = (itemId: string) => {
    setLoading(true);
    removeItem(itemId);
    setLoading(false);
  };

  // Use local items for now (when Shopify is connected, we can switch to cart.lines)
  const hasItems = localItems.length > 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-semibold font-heading text-primary">Your Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-surface rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-primary" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {!hasItems ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-border mb-4" />
                <p className="text-primary font-medium mb-2">Your cart is empty</p>
                <p className="text-muted text-sm mb-4">
                  Looks like you haven't added anything yet
                </p>
                <Button variant="outline" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {localItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 p-3 bg-surface rounded-lg"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.productHandle}`}
                      onClick={closeCart}
                      className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-surface"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.productTitle}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted text-xs">
                          No image
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/products/${item.productHandle}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-primary line-clamp-1 hover:text-accent transition-colors"
                      >
                        {item.productTitle}
                      </Link>
                      {item.variantTitle !== 'Default' && (
                        <p className="text-xs text-muted">
                          {item.variantTitle}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {formatPrice(item.price, item.currencyCode)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-full">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="p-1 hover:bg-surface rounded-l-full disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4 text-primary" />
                          </button>
                          <span className="px-3 text-sm font-medium text-primary min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 hover:bg-surface rounded-r-full disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4 text-primary" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isLoading}
                          className="p-1 text-muted hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {hasItems && (
            <div className="border-t border-border p-4 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal ({localItems.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-primary">
                <span>Total</span>
                <span>
                  {total
                    ? formatPrice(total.amount, total.currencyCode)
                    : 'Rs. 0'}
                </span>
              </div>

              {/* Checkout Button */}
              <Button className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Proceed to Checkout'}
              </Button>

              {/* Continue Shopping */}
              <button
                onClick={closeCart}
                className="w-full text-sm text-center text-primary hover:text-accent transition-colors"
              >
                Continue Shopping
              </button>

              <p className="text-xs text-center text-muted">
                Free shipping on orders above Rs. 499
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
