// Mock product data based on NutriBites demo data
// This mirrors Shopify Storefront API structure for easy transition later

import { Product } from '@/lib/shopify/types';

// Placeholder images from Unsplash (healthy food related)
const PLACEHOLDER_IMAGES = {
  proteinBalls: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=600&fit=crop',
  makhana: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=600&fit=crop',
  chikki: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
  ragiChips: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&h=600&fit=crop',
  jowarPuffs: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=600&fit=crop',
  milletCookies: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=600&fit=crop',
  dateLaddoo: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&h=600&fit=crop',
  dryFruitBarfi: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=600&h=600&fit=crop',
  coconutBalls: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=600&fit=crop',
  bakedBhujia: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=600&fit=crop',
  quinoaChakli: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&h=600&fit=crop',
  trailMix: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&h=600&fit=crop',
  starterBox: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600&h=600&fit=crop',
  giftHamper: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600&h=600&fit=crop',
  proteinBundle: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=600&h=600&fit=crop',
};

function createMockImage(url: string, alt: string) {
  return {
    url,
    altText: alt,
    width: 600,
    height: 600,
  };
}

interface ProductOptions {
  variants?: { title: string; price: string }[];
  rating?: number;
  reviewCount?: number;
  mood?: string[];
}

function createMockProduct(
  id: string,
  handle: string,
  title: string,
  description: string,
  priceAmount: string,
  compareAtPrice: string | null,
  imageUrl: string,
  tags: string[],
  options: ProductOptions = {}
): Product {
  const variants = options.variants || [{ title: 'Default', price: priceAmount }];
  return {
    id: `gid://shopify/Product/${id}`,
    handle,
    title,
    description,
    descriptionHtml: `<p>${description}</p>`,
    availableForSale: true,
    featuredImage: createMockImage(imageUrl, title),
    images: [createMockImage(imageUrl, title)],
    options: variants.length > 1
      ? [{ id: '1', name: 'Flavor', values: variants.map(v => v.title) }]
      : [{ id: '1', name: 'Title', values: ['Default Title'] }],
    priceRange: {
      minVariantPrice: { amount: priceAmount, currencyCode: 'INR' },
      maxVariantPrice: { amount: priceAmount, currencyCode: 'INR' },
    },
    variants: variants.map((v, index) => ({
      id: `gid://shopify/ProductVariant/${id}${index}`,
      title: v.title,
      availableForSale: true,
      selectedOptions: [{ name: variants.length > 1 ? 'Flavor' : 'Title', value: v.title }],
      price: { amount: v.price, currencyCode: 'INR' },
      compareAtPrice: compareAtPrice ? { amount: compareAtPrice, currencyCode: 'INR' } : null,
    })),
    tags,
    updatedAt: new Date().toISOString(),
    rating: options.rating ?? (4 + Math.random() * 0.9), // Random rating between 4.0-4.9
    reviewCount: options.reviewCount ?? Math.floor(Math.random() * 200 + 20), // Random 20-220 reviews
    mood: options.mood ?? [],
  };
}

// All 15 products from NutriBites demo data
export const mockProducts: Product[] = [
  // Category: Protein Snacks
  createMockProduct(
    '1',
    'protein-power-balls',
    'Protein Power Balls (Pack of 12)',
    'Packed with 8g protein per ball. Made with dates, nuts, and whey protein. Perfect post-workout snack. 240g pack.',
    '399',
    '499',
    PLACEHOLDER_IMAGES.proteinBalls,
    ['Protein', 'Post-Workout', 'No Sugar Added', 'Bestseller'],
    {
      variants: [
        { title: 'Chocolate', price: '399' },
        { title: 'Peanut Butter', price: '399' },
        { title: 'Mixed Berry', price: '399' },
      ],
      rating: 4.8,
      reviewCount: 156,
      mood: ['fitness', 'energy'],
    }
  ),
  createMockProduct(
    '2',
    'roasted-makhana-protein-crunch',
    'Roasted Makhana - Protein Crunch',
    'Crunchy fox nuts roasted to perfection with a protein-rich coating. Only 120 calories per serving. 100g pack.',
    '249',
    null,
    PLACEHOLDER_IMAGES.makhana,
    ['Low Calorie', 'High Protein', 'Gluten-Free'],
    {
      variants: [
        { title: 'Peri Peri', price: '249' },
        { title: 'Cheese', price: '249' },
        { title: 'Classic Salt', price: '249' },
      ],
      rating: 4.5,
      reviewCount: 89,
      mood: ['wellness', 'work'],
    }
  ),
  createMockProduct(
    '3',
    'peanut-protein-chikki',
    'Peanut Protein Chikki',
    'Traditional chikki reimagined with added protein. Crunchy, sweet, and nutritious. 200g (10 pieces).',
    '299',
    null,
    PLACEHOLDER_IMAGES.chikki,
    ['Traditional', 'Protein', 'No Preservatives'],
    {
      rating: 4.6,
      reviewCount: 72,
      mood: ['energy', 'fitness'],
    }
  ),

  // Category: Millet Munchies
  createMockProduct(
    '4',
    'ragi-chips-tangy-tomato',
    'Ragi Chips - Tangy Tomato',
    'Crispy chips made from finger millet. 60% less fat than regular chips. 100g pack.',
    '149',
    null,
    PLACEHOLDER_IMAGES.ragiChips,
    ['Millet', 'Baked', 'Low Fat'],
    {
      rating: 4.3,
      reviewCount: 128,
      mood: ['kids', 'party'],
    }
  ),
  createMockProduct(
    '5',
    'jowar-puffs-assorted',
    'Jowar Puffs Assorted',
    'Light, airy puffs made from sorghum. Available in 4 exciting flavors. 150g (4 packs).',
    '199',
    null,
    PLACEHOLDER_IMAGES.jowarPuffs,
    ['Millet', 'Kids Favorite', 'No Maida'],
    {
      variants: [
        { title: 'Cheese', price: '199' },
        { title: 'Herbs', price: '199' },
        { title: 'Masala', price: '199' },
        { title: 'Plain', price: '199' },
      ],
      rating: 4.7,
      reviewCount: 203,
      mood: ['kids', 'party'],
    }
  ),
  createMockProduct(
    '6',
    'millet-cookies-choco-chip',
    'Millet Cookies - Choco Chip',
    'Wholesome cookies made with multi-millet flour. Sweetened with jaggery. 200g (12 cookies).',
    '249',
    null,
    PLACEHOLDER_IMAGES.milletCookies,
    ['Millet', 'Jaggery', 'Eggless'],
    {
      rating: 4.4,
      reviewCount: 95,
      mood: ['kids', 'work'],
    }
  ),

  // Category: Guilt-Free Sweets
  createMockProduct(
    '7',
    'date-nut-laddoo',
    'Date & Nut Laddoo (Pack of 8)',
    'Zero added sugar laddoos made with premium dates, almonds, and cashews. 200g pack.',
    '349',
    null,
    PLACEHOLDER_IMAGES.dateLaddoo,
    ['No Sugar', 'Traditional', 'Gift-Ready', 'Bestseller'],
    {
      rating: 4.9,
      reviewCount: 178,
      mood: ['wellness', 'party'],
    }
  ),
  createMockProduct(
    '8',
    'dry-fruit-barfi',
    'Dry Fruit Barfi',
    'Rich, creamy barfi loaded with dry fruits. Sweetened naturally with dates. 250g pack.',
    '449',
    null,
    PLACEHOLDER_IMAGES.dryFruitBarfi,
    ['Premium', 'No Sugar', 'Festive Special'],
    {
      rating: 4.7,
      reviewCount: 64,
      mood: ['party', 'wellness'],
    }
  ),
  createMockProduct(
    '9',
    'coconut-bliss-balls',
    'Coconut Bliss Balls',
    'Vegan coconut treats with a hint of cardamom. Melt-in-mouth goodness. 180g (9 pieces).',
    '299',
    null,
    PLACEHOLDER_IMAGES.coconutBalls,
    ['Vegan', 'Gluten-Free', 'No Dairy'],
    {
      rating: 4.5,
      reviewCount: 52,
      mood: ['wellness'],
    }
  ),

  // Category: Crunchy Namkeen
  createMockProduct(
    '10',
    'baked-bhujia',
    'Baked Bhujia',
    'Classic bhujia, now baked not fried. Same taste, 40% less oil. 150g pack.',
    '179',
    null,
    PLACEHOLDER_IMAGES.bakedBhujia,
    ['Baked', 'Traditional', 'Less Oil'],
    {
      rating: 4.2,
      reviewCount: 87,
      mood: ['party', 'work'],
    }
  ),
  createMockProduct(
    '11',
    'quinoa-chakli',
    'Quinoa Chakli',
    'Crunchy chakli made with quinoa and rice flour. A superfood twist on tradition. 200g pack.',
    '199',
    null,
    PLACEHOLDER_IMAGES.quinoaChakli,
    ['Quinoa', 'Baked', 'High Fiber'],
    {
      rating: 4.4,
      reviewCount: 45,
      mood: ['wellness', 'party'],
    }
  ),
  createMockProduct(
    '12',
    'mixed-nuts-trail-mix',
    'Mixed Nuts Trail Mix',
    'Premium mix of almonds, cashews, walnuts, and dried cranberries. 200g pack.',
    '399',
    null,
    PLACEHOLDER_IMAGES.trailMix,
    ['Premium', 'No Salt', 'Energy Boost'],
    {
      rating: 4.8,
      reviewCount: 134,
      mood: ['energy', 'work', 'fitness'],
    }
  ),

  // Category: Gift Hampers
  createMockProduct(
    '13',
    'nutribites-starter-box',
    'NutriBites Starter Box',
    'Perfect introduction to healthy snacking. Contains 5 bestselling products: Protein Balls, Ragi Chips, Makhana, Trail Mix, and Date Laddoo.',
    '799',
    '999',
    PLACEHOLDER_IMAGES.starterBox,
    ['Gift', 'Value Pack', 'Bestseller'],
    {
      rating: 4.9,
      reviewCount: 212,
      mood: ['party'],
    }
  ),
  createMockProduct(
    '14',
    'festival-gift-hamper-premium',
    'Festival Gift Hamper - Premium',
    'Luxurious gift box with 8 premium products in beautiful packaging. Perfect for Diwali, Holi, and special occasions.',
    '1499',
    '1899',
    PLACEHOLDER_IMAGES.giftHamper,
    ['Premium Gift', 'Festival', 'Corporate'],
    {
      rating: 4.8,
      reviewCount: 76,
      mood: ['party'],
    }
  ),
  createMockProduct(
    '15',
    'protein-lovers-bundle',
    'Protein Lover\'s Bundle',
    'Complete protein snack collection for fitness enthusiasts. Includes all 3 protein products + Free Shaker Bottle.',
    '999',
    null,
    PLACEHOLDER_IMAGES.proteinBundle,
    ['Protein', 'Fitness', 'Bundle'],
    {
      rating: 4.7,
      reviewCount: 98,
      mood: ['fitness', 'energy'],
    }
  ),
];

// Helper functions to get products
export function getMockProducts(): Product[] {
  return mockProducts;
}

export function getMockProductByHandle(handle: string): Product | undefined {
  return mockProducts.find(p => p.handle === handle);
}

export function getMockProductsByTag(tag: string): Product[] {
  return mockProducts.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

export function getMockBestsellers(): Product[] {
  return mockProducts.filter(p => p.tags.includes('Bestseller'));
}

export function getMockFeaturedProducts(count: number = 8): Product[] {
  return mockProducts.slice(0, count);
}

export function searchMockProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

export function getMockProductsByMood(mood: string): Product[] {
  return mockProducts.filter(p => p.mood?.includes(mood.toLowerCase()));
}
