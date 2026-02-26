// Get Shopify config - supports both server-side and client-side env vars
function getConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  return { domain, storefrontAccessToken };
}

// Check if Shopify is properly configured
export function isShopifyConfigured(): boolean {
  const { domain, storefrontAccessToken } = getConfig();
  return !!(
    domain &&
    storefrontAccessToken &&
    !domain.includes('your-store') &&
    domain.includes('.myshopify.com')
  );
}

function getEndpoint(): string {
  const { domain } = getConfig();
  return domain ? `https://${domain}/api/2024-10/graphql.json` : '';
}

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string; locations?: { line: number; column: number }[] }[];
};

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  // Check configuration before making request
  if (!isShopifyConfigured()) {
    throw new Error(
      'Shopify is not configured. Please add valid SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env.local file.'
    );
  }

  const { storefrontAccessToken } = getConfig();
  const endpoint = getEndpoint();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result: ShopifyResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    const errorMessages = result.errors.map((e) => e.message).join('\n');
    console.error('Shopify GraphQL Errors:', result.errors);
    throw new Error(`Shopify GraphQL Error: ${errorMessages}`);
  }

  if (!result.data) {
    throw new Error('Shopify returned empty data');
  }

  return result.data;
}

// Helper to remove edges/nodes from Shopify response
export function removeEdgesAndNodes<T>(array: { edges: { node: T }[] }): T[] {
  return array.edges.map((edge) => edge.node);
}

// Format price for display
export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}
