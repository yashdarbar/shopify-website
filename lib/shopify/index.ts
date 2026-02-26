import { shopifyFetch, removeEdgesAndNodes, formatPrice, isShopifyConfigured } from './client';
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
  GET_PRODUCTS_BY_COLLECTION_QUERY,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  SEARCH_PRODUCTS_QUERY,
} from './queries';
import type { ShopifyProduct, ShopifyCollection, ShopifyCart, Product, Collection, Cart } from './types';

// Transform Shopify product to simplified format
function reshapeProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: removeEdgesAndNodes(product.images),
    variants: removeEdgesAndNodes(product.variants),
  };
}

// Transform Shopify collection to simplified format
function reshapeCollection(collection: ShopifyCollection & { products?: { edges: { node: ShopifyProduct }[] } }): Collection {
  return {
    ...collection,
    products: collection.products ? removeEdgesAndNodes(collection.products).map(reshapeProduct) : [],
  };
}

// Product APIs
export async function getProducts(count: number = 20): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: count },
    tags: ['products'],
  });

  return removeEdgesAndNodes(data.products).map(reshapeProduct);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: ['products', handle],
  });

  return data.product ? reshapeProduct(data.product) : null;
}

export async function searchProducts(query: string, count: number = 20): Promise<Product[]> {
  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first: count },
    cache: 'no-store',
  });

  return removeEdgesAndNodes(data.products).map(reshapeProduct);
}

// Collection APIs
export async function getCollections(count: number = 10): Promise<Omit<Collection, 'products'>[]> {
  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: count },
    tags: ['collections'],
  });

  return removeEdgesAndNodes(data.collections);
}

export async function getCollectionByHandle(handle: string, productCount: number = 20): Promise<Collection | null> {
  const data = await shopifyFetch<{ collection: (ShopifyCollection & { products: { edges: { node: ShopifyProduct }[] } }) | null }>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first: productCount },
    tags: ['collections', handle],
  });

  return data.collection ? reshapeCollection(data.collection) : null;
}

export async function getCollectionProducts(handle: string, count: number = 20): Promise<Product[]> {
  const data = await shopifyFetch<{ collection: { products: { edges: { node: ShopifyProduct }[] } } | null }>({
    query: GET_PRODUCTS_BY_COLLECTION_QUERY,
    variables: { handle, first: count },
    tags: ['collections', handle, 'products'],
  });

  if (!data.collection) return [];
  return removeEdgesAndNodes(data.collection.products).map(reshapeProduct);
}

// Cart APIs
export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: CREATE_CART_MUTATION,
    cache: 'no-store',
  });

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  });

  return data.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesAdd.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return data.cartLinesRemove.cart;
}

// Re-export utilities
export { formatPrice, isShopifyConfigured };
export * from './types';
