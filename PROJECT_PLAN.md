# Shopify Headless Storefront with Next.js - Project Plan

## Project Overview
Build a custom Shopify headless storefront using Next.js for the frontend, with Shopify managing all backend operations (products, cart, checkout, payments, orders).

## Current State
- **Framework**: Next.js 16.1.6 with React 19.2.3
- **Styling**: Tailwind CSS v4
- **TypeScript**: Configured
- **Shopify**: Headless setup complete with public/private tokens (user-provided)

---

## Architecture Decisions

### State Management
**Recommendation: Zustand (lightweight) + React Context for cart**

You do NOT need heavy state management libraries like Redux. Here's why:
- Shopify handles all critical data (products, inventory, pricing, orders)
- Cart state is the main client-side state needed
- Zustand is simple, minimal boilerplate, perfect for cart operations
- Server Components handle most data fetching (no client state needed)

**What you need:**
- `zustand` - For cart state (add/remove/update items, cart count)
- React Context - For simple UI state (modals, mobile menu, etc.)

### Data Fetching
- **Shopify Storefront API (GraphQL)** - For products, collections, cart
- **React Server Components** - Fetch data on server, reduce client JS
- **Server Actions** - For cart mutations with optimistic updates

### Checkout Flow
- Redirect to **Shopify's hosted checkout** via `cart.checkoutUrl`
- Do NOT build custom checkout (Shopify handles payments, tax, shipping)

---

## Required Packages

```bash
# Core Shopify Integration
npm install @shopify/hydrogen-react   # React hooks/components for Shopify

# State Management
npm install zustand                    # Cart state management

# UI/UX (optional but recommended)
npm install lucide-react              # Icons
npm install clsx                       # Conditional classnames
```

---

## Project Structure

```
app/
├── layout.tsx                 # Root layout with cart provider
├── page.tsx                   # Homepage
├── products/
│   ├── page.tsx              # Products listing
│   └── [handle]/
│       └── page.tsx          # Product detail page
├── collections/
│   ├── page.tsx              # Collections listing
│   └── [handle]/
│       └── page.tsx          # Collection page
├── cart/
│   └── page.tsx              # Cart page
├── search/
│   └── page.tsx              # Search results
└── api/                       # API routes (if needed)

components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── MobileMenu.tsx
├── product/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── ProductGallery.tsx
│   └── ProductInfo.tsx
├── cart/
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   └── CartButton.tsx
├── collection/
│   ├── CollectionCard.tsx
│   └── CollectionGrid.tsx
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    └── ...

lib/
├── shopify/
│   ├── client.ts             # Shopify GraphQL client
│   ├── queries.ts            # GraphQL queries
│   ├── mutations.ts          # GraphQL mutations
│   └── types.ts              # TypeScript types
├── store/
│   └── cart.ts               # Zustand cart store
└── utils.ts                   # Helper functions
```

---

## Implementation Phases

### Phase 1: Foundation Setup
1. Set up environment variables (.env.local)
2. Create Shopify GraphQL client
3. Define TypeScript types for Shopify data
4. Set up Zustand cart store
5. Create cart context provider

### Phase 2: Core UI Components
1. Layout components (Header, Footer, Navigation)
2. UI primitives (Button, Input, etc.)
3. Product components (Card, Grid, Gallery)
4. Cart components (Drawer, Item, Button)

### Phase 3: Pages
1. Homepage with featured products/collections
2. Product listing page
3. Product detail page
4. Collection pages
5. Cart page
6. Search functionality

### Phase 4: Cart Integration
1. Add to cart functionality
2. Cart drawer/page
3. Update quantities
4. Remove items
5. Checkout redirect to Shopify

### Phase 5: Polish
1. Loading states & skeletons
2. Error handling
3. SEO optimization
4. Performance optimization
5. Mobile responsiveness

---

## Environment Variables Required

```env
# .env.local
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-public-token
SHOPIFY_ADMIN_ACCESS_TOKEN=your-private-token  # Only if needed
```

---

## Key Files to Create/Modify

### Initial Setup
- `/app/layout.tsx` - Add cart provider
- `/lib/shopify/client.ts` - GraphQL client
- `/lib/shopify/queries.ts` - Product/collection queries
- `/lib/store/cart.ts` - Zustand cart store
- `/.env.local` - Environment variables

### UI Phase
- `/components/layout/Header.tsx`
- `/components/layout/Footer.tsx`
- `/components/product/ProductCard.tsx`
- `/components/cart/CartDrawer.tsx`

---

## Notes
- Use Vercel's Next.js Commerce as reference: https://github.com/vercel/commerce
- Shopify Storefront API docs: https://shopify.dev/docs/api/storefront
- Always use Shopify's checkout - don't build custom payment handling
