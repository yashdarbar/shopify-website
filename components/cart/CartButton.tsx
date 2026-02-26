'use client';

import { ShoppingBag } from 'lucide-react';
import { useCartStore, useCartCount } from '@/lib/store/cart';

export function CartButton() {
  const count = useCartCount();
  const { toggleCart, isLoading } = useCartStore();

  return (
    <button
      onClick={toggleCart}
      className="relative flex items-center justify-center p-2 text-white/90 hover:text-accent transition-colors"
      aria-label={`Shopping cart with ${count} items`}
      disabled={isLoading}
    >
      <ShoppingBag className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
