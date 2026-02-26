# NutriBites Headless Shopify Store - Implementation Plan

## Overview
Build a production-ready headless Shopify store for NutriBites using Next.js 16.1, where **all content is editable from Shopify Admin** via Metaobjects.

**Stack**: Next.js 16.1 + @shopify/hydrogen-react + Tailwind CSS 4 + Zustand + Lucide icons

---

## What Will Be Editable from Shopify Admin

| Content | Metaobject Type | Shopify Admin Path |
|---------|-----------------|-------------------|
| Hero Banners | `hero_banner` | Settings > Custom data > Metaobjects |
| Announcement Bar | `site_settings` | Settings > Custom data > Metaobjects |
| Trust Badges | `trust_badge` | Settings > Custom data > Metaobjects |
| Testimonials | `testimonial` | Settings > Custom data > Metaobjects |
| FAQ Items | `faq_item` | Settings > Custom data > Metaobjects |
| About/Contact Content | `page_content` | Settings > Custom data > Metaobjects |
| Newsletter Text | `newsletter_settings` | Settings > Custom data > Metaobjects |
| Contact Info | `contact_info` | Settings > Custom data > Metaobjects |
| **Products/Collections** | Native Shopify | Products menu |

---

## Project Structure (To Build)

```
app/
├── (shop)/
│   ├── products/page.tsx              # Product listing
│   ├── products/[handle]/page.tsx     # Product detail
│   ├── collections/page.tsx           # All collections
│   ├── collections/[handle]/page.tsx  # Collection page
│   ├── cart/page.tsx                  # Full cart page
│   └── search/page.tsx                # Search results
├── (info)/
│   ├── about/page.tsx                 # About page (CMS)
│   ├── contact/page.tsx               # Contact page (CMS)
│   └── faq/page.tsx                   # FAQ page (CMS)
├── (account)/
│   ├── account/page.tsx               # Account dashboard
│   ├── login/page.tsx                 # Login page
│   └── register/page.tsx              # Register page
├── api/auth/                          # Auth API routes
├── globals.css                        # NutriBites colors
├── layout.tsx                         # Fonts + providers
└── page.tsx                           # Homepage

components/
├── cms/                               # CMS-driven components
│   ├── CMSHeroSection.tsx
│   ├── CMSTrustBadges.tsx
│   ├── CMSTestimonials.tsx
│   ├── CMSNewsletterSection.tsx
│   └── CMSAnnouncementBar.tsx
├── product/
│   ├── ProductGallery.tsx
│   ├── ProductVariants.tsx
│   ├── ProductFilters.tsx
│   └── AddToCartButton.tsx
└── ui/
    ├── Input.tsx
    ├── Accordion.tsx
    └── Toast.tsx

lib/
├── shopify/
│   ├── client.ts                      # (exists)
│   ├── metaobjects.ts                 # NEW - CMS queries
│   └── customer.ts                    # NEW - Auth API
└── store/
    └── cart.ts                        # (exists)
```

---

## Shopify Setup Required (In Shopify Admin)

### 1. Create Metaobject Definitions

Go to **Settings > Custom data > Metaobject definitions** and create:

**hero_banner**
- headline (Single line text)
- subtext (Multi-line text)
- button_text (Single line text)
- button_link (URL)
- background_image (File)
- order (Integer)
- is_active (Boolean)

**trust_badge**
- title (Single line text)
- icon (Single line text - Lucide icon name)
- description (Single line text)
- order (Integer)

**testimonial**
- customer_name (Single line text)
- location (Single line text)
- rating (Integer)
- review_text (Multi-line text)
- is_featured (Boolean)

**faq_item**
- question (Single line text)
- answer (Rich text)
- category (Single line text)
- order (Integer)

**page_content**
- page_identifier (Single line text - "about_us", "contact")
- headline (Single line text)
- content (Rich text)
- featured_image (File)

**site_settings** (singleton)
- site_name (Single line text)
- tagline (Single line text)
- logo (File)
- announcement_bar_text (Single line text)
- announcement_bar_enabled (Boolean)

### 2. Create Storefront API Access Token
Settings > Apps > Develop apps > Create app > Storefront API

---

## Implementation Order

### Phase 1: Foundation & Mock Data (Files: 8)
1. Update `app/globals.css` - NutriBites colors
2. Update `app/layout.tsx` - Montserrat + Open Sans fonts
3. Create `lib/mock-data/products.ts` - 15 products from demo data
4. Create `lib/mock-data/collections.ts` - 5 collections
5. Create `lib/mock-data/site-content.ts` - Banners, badges, testimonials, FAQ
6. Create `types/index.ts` - TypeScript types
7. Update `lib/shopify/client.ts` - Use mock data (Shopify-ready structure)
8. Update Header/Footer with NutriBites branding

### Phase 2: CMS Components (Files: 6)
9. `components/cms/CMSAnnouncementBar.tsx`
10. `components/cms/CMSHeroSection.tsx`
11. `components/cms/CMSTrustBadges.tsx`
12. `components/cms/CMSTestimonials.tsx`
13. `components/cms/CMSNewsletterSection.tsx`
14. Update `app/page.tsx` - Wire up CMS components

### Phase 3: Shop Pages (Files: 8)
15. `app/(shop)/products/page.tsx` - Product listing
16. `components/product/ProductFilters.tsx`
17. `app/(shop)/products/[handle]/page.tsx` - Product detail
18. `components/product/ProductGallery.tsx`
19. `components/product/ProductVariants.tsx`
20. `app/(shop)/collections/[handle]/page.tsx`
21. `app/(shop)/cart/page.tsx`
22. `app/(shop)/search/page.tsx`

### Phase 4: Info Pages (Files: 3)
23. `app/(info)/about/page.tsx`
24. `app/(info)/contact/page.tsx`
25. `app/(info)/faq/page.tsx`

### Phase 5: Authentication (Files: 6)
26. `lib/shopify/customer.ts`
27. `app/api/auth/login/route.ts`
28. `app/api/auth/callback/route.ts`
29. `app/(account)/login/page.tsx`
30. `app/(account)/account/page.tsx`
31. `middleware.ts` - Route protection

---

## Design System

### Colors (NutriBites Brand)
```css
--primary: #2D5A4A;        /* Deep Forest Green */
--accent: #E87B35;         /* Warm Orange */
--cream: #F5E6D3;          /* Cream background */
--text: #333333;           /* Dark text */
--white: #FFFFFF;          /* White */
```

### Typography
- **Headings**: Montserrat Bold (700)
- **Body**: Open Sans Regular (400)

### Color Schemes
| Section | Background | Buttons |
|---------|------------|---------|
| Default | White | Green |
| Featured | Cream | Orange |
| Footer/Newsletter | Green | Orange |

---

## Data Approach: Demo/Mock Data First

Since no Shopify store is connected yet, we'll build with **mock data** that mirrors the real Shopify API structure:

```
lib/
├── mock-data/
│   ├── products.ts        # 15 products from shopify_demo_data.md
│   ├── collections.ts     # 5 collections
│   ├── testimonials.ts    # 5 reviews
│   ├── banners.ts         # 3 hero banners
│   ├── faq.ts             # FAQ items
│   └── site-settings.ts   # Brand info
└── shopify/
    ├── client.ts          # API client (uses mock data for now)
    └── ...
```

**Benefits**:
- Full UI works immediately
- Easy to test all features
- When Shopify is ready, just swap `getMockProducts()` → `getProducts()` from Storefront API

**Transition to Real Shopify**:
1. Create Shopify store
2. Add Storefront API token to `.env.local`
3. Create Metaobject definitions in Shopify Admin
4. Update `lib/shopify/client.ts` to use real API

## Environment Variables (For Later)

```env
# Add these when connecting to real Shopify store
SHOPIFY_STORE_DOMAIN=nutribites-demo.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=nutribites-demo.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxx
```

---

## Pages Summary

| Page | Route | Data Source |
|------|-------|-------------|
| Homepage | `/` | Metaobjects + Products API |
| Products | `/products` | Products API |
| Product Detail | `/products/[handle]` | Products API |
| Collections | `/collections` | Collections API |
| Collection | `/collections/[handle]` | Collections API |
| Cart | `/cart` | Cart API (Zustand) |
| Search | `/search` | Products API |
| About | `/about` | page_content Metaobject |
| Contact | `/contact` | page_content + contact_info Metaobjects |
| FAQ | `/faq` | faq_item Metaobjects |
| Login | `/login` | Customer Account API |
| Account | `/account` | Customer Account API |

---

## Key Technical Notes

1. **All CMS content fetched server-side** with `cache: 'force-cache'`
2. **Revalidation**: Set up webhook from Shopify to `/api/revalidate` for instant updates
3. **Cart**: Client-side Zustand store, persisted to Shopify Cart API
4. **Auth**: OAuth flow with Shopify Customer Account API
5. **Images**: Next.js Image with `cdn.shopify.com` configured

---

## Estimated Scope
- **31 main files** to create/modify
- **8 Metaobject definitions** in Shopify (for later)
- **12 pages** total
- Full store functionality with CMS-managed content

---

## Reference Files
- `shopify_demo_data.md` - All product data, content, and brand guidelines
