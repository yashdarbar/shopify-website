'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Grid3X3, UtensilsCrossed, ShoppingCart } from 'lucide-react';
import { useCartCount } from '@/lib/store/cart';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/products', icon: ShoppingBag },
  { name: 'Categories', href: '/collections', icon: Grid3X3 },
  { name: 'Recipes', href: '/recipes', icon: UtensilsCrossed },
  { name: 'Cart', href: '/cart', icon: ShoppingCart },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartCount = useCartCount();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                active ? 'text-accent' : 'text-muted hover:text-primary'
              }`}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full" />
              )}

              <div className="relative">
                <Icon className="h-5 w-5" />
                {/* Cart badge */}
                {item.name === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
