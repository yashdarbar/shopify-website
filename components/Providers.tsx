'use client';

import { ShopifyProvider } from '@shopify/hydrogen-react';
import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { createCart, getCart } from '@/lib/shopify';

interface ProvidersProps {
  children: React.ReactNode;
}

function CartInitializer({ children }: { children: React.ReactNode }) {
  const { cartId, setCart, setCartId, setLoading } = useCartStore();

  useEffect(() => {
    const initCart = async () => {
      // Skip cart initialization if Shopify is not configured
      if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
        return;
      }

      setLoading(true);
      try {
        if (cartId) {
          // Try to fetch existing cart
          const existingCart = await getCart(cartId);
          if (existingCart) {
            setCart(existingCart);
          } else {
            // Cart expired or invalid, create new one
            const newCart = await createCart();
            setCart(newCart);
            setCartId(newCart.id);
          }
        } else {
          // No cart ID, create new cart
          const newCart = await createCart();
          setCart(newCart);
          setCartId(newCart.id);
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
        // Try to create a new cart on error
        try {
          const newCart = await createCart();
          setCart(newCart);
          setCartId(newCart.id);
        } catch (e) {
          console.error('Failed to create new cart:', e);
        }
      } finally {
        setLoading(false);
      }
    };

    initCart();
  }, [cartId, setCart, setCartId, setLoading]);

  return <>{children}</>;
}

export function Providers({ children }: ProvidersProps) {
  // Check if Shopify is configured
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // If Shopify is not configured, render children without ShopifyProvider
  if (!storeDomain || !storefrontToken) {
    console.warn('Shopify environment variables not configured. Running in demo mode.');
    return <>{children}</>;
  }

  const shopifyConfig = {
    storeDomain: `https://${storeDomain}`,
    storefrontToken: storefrontToken,
    storefrontApiVersion: '2024-10',
    countryIsoCode: 'US' as const,
    languageIsoCode: 'EN' as const,
  };

  return (
    <ShopifyProvider {...shopifyConfig}>
      <CartInitializer>{children}</CartInitializer>
    </ShopifyProvider>
  );
}
