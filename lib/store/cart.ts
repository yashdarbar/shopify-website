'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ShopifyProductVariant, Cart, CartItem } from '@/lib/shopify/types';

// Local cart item for mock implementation
interface LocalCartItem {
  id: string;
  productId: string;
  productHandle: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  price: string;
  currencyCode: string;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  // For Shopify integration
  cart: Cart | null;
  cartId: string | null;

  // For local/mock cart
  localItems: LocalCartItem[];

  // UI state
  isOpen: boolean;
  isLoading: boolean;

  // Actions
  setCart: (cart: Cart | null) => void;
  setCartId: (cartId: string | null) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setLoading: (loading: boolean) => void;

  // Local cart actions
  addItem: (product: Product, variant: ShopifyProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      cartId: null,
      localItems: [],
      isOpen: false,
      isLoading: false,

      setCart: (cart) => set({ cart }),
      setCartId: (cartId) => set({ cartId }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setLoading: (isLoading) => set({ isLoading }),

      // Add item to local cart
      addItem: (product, variant) => {
        const { localItems } = get();
        const itemId = `${product.id}-${variant.id}`;

        const existingItem = localItems.find((item) => item.id === itemId);

        if (existingItem) {
          // Update quantity
          set({
            localItems: localItems.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Add new item
          const newItem: LocalCartItem = {
            id: itemId,
            productId: product.id,
            productHandle: product.handle,
            productTitle: product.title,
            variantId: variant.id,
            variantTitle: variant.title,
            price: variant.price.amount,
            currencyCode: variant.price.currencyCode,
            quantity: 1,
            imageUrl: product.featuredImage?.url,
          };
          set({ localItems: [...localItems, newItem] });
        }
      },

      // Remove item from local cart
      removeItem: (itemId) => {
        set({
          localItems: get().localItems.filter((item) => item.id !== itemId),
        });
      },

      // Update item quantity
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          localItems: get().localItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      // Clear cart
      clearCart: () => {
        set({ localItems: [], cart: null });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartId: state.cartId,
        localItems: state.localItems,
      }),
    }
  )
);

// Helper hook to get cart item count
export const useCartCount = () => {
  const cart = useCartStore((state) => state.cart);
  const localItems = useCartStore((state) => state.localItems);

  // If Shopify cart exists, use that count
  if (cart) {
    return cart.totalQuantity;
  }

  // Otherwise use local items count
  return localItems.reduce((sum, item) => sum + item.quantity, 0);
};

// Helper hook to get cart total
export const useCartTotal = () => {
  const cart = useCartStore((state) => state.cart);
  const localItems = useCartStore((state) => state.localItems);

  // If Shopify cart exists, use that total
  if (cart) {
    return cart.cost.totalAmount;
  }

  // Otherwise calculate from local items
  const total = localItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return {
    amount: total.toString(),
    currencyCode: localItems[0]?.currencyCode || 'INR',
  };
};

// Helper hook to get local cart items
export const useLocalCartItems = () => {
  return useCartStore((state) => state.localItems);
};
