// Mock collection data based on Welwach demo data

import { Collection } from '@/lib/shopify/types';
import { mockProducts } from './products';

// Placeholder images for collections
const COLLECTION_IMAGES = {
  proteinSnacks: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&h=600&fit=crop',
  milletMunchies: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop',
  guiltFreeSweets: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&h=600&fit=crop',
  crunchyNamkeen: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop',
  giftHampers: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&h=600&fit=crop',
  bestsellers: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=800&h=600&fit=crop',
  newArrivals: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=800&h=600&fit=crop',
};

function createMockImage(url: string, alt: string) {
  return {
    url,
    altText: alt,
    width: 800,
    height: 600,
  };
}

export const mockCollections: Collection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'protein-snacks',
    title: 'Protein Snacks',
    description: 'Fuel your fitness journey with our protein-packed snacks. Perfect for post-workout recovery or a healthy energy boost.',
    image: createMockImage(COLLECTION_IMAGES.proteinSnacks, 'Protein Snacks Collection'),
    products: mockProducts.filter(p =>
      p.tags.some(t => ['Protein', 'Post-Workout', 'High Protein'].includes(t))
    ),
  },
  {
    id: 'gid://shopify/Collection/2',
    handle: 'millet-munchies',
    title: 'Millet Munchies',
    description: 'Discover the goodness of ancient grains. Our millet-based snacks are nutritious, delicious, and perfect for guilt-free snacking.',
    image: createMockImage(COLLECTION_IMAGES.milletMunchies, 'Millet Munchies Collection'),
    products: mockProducts.filter(p =>
      p.tags.some(t => ['Millet', 'No Maida', 'Jaggery'].includes(t))
    ),
  },
  {
    id: 'gid://shopify/Collection/3',
    handle: 'guilt-free-sweets',
    title: 'Guilt-Free Sweets',
    description: 'Satisfy your sweet cravings without the guilt. Made with natural sweeteners and premium ingredients.',
    image: createMockImage(COLLECTION_IMAGES.guiltFreeSweets, 'Guilt-Free Sweets Collection'),
    products: mockProducts.filter(p =>
      p.tags.some(t => ['No Sugar', 'Traditional', 'Vegan', 'Gift-Ready'].includes(t)) &&
      !p.tags.includes('Bundle')
    ),
  },
  {
    id: 'gid://shopify/Collection/4',
    handle: 'crunchy-namkeen',
    title: 'Crunchy Namkeen',
    description: 'Traditional Indian snacks, reimagined for the health-conscious. Baked, not fried, with authentic flavors.',
    image: createMockImage(COLLECTION_IMAGES.crunchyNamkeen, 'Crunchy Namkeen Collection'),
    products: mockProducts.filter(p =>
      p.tags.some(t => ['Baked', 'Traditional', 'Less Oil', 'Quinoa', 'High Fiber'].includes(t)) &&
      !p.tags.includes('Protein')
    ),
  },
  {
    id: 'gid://shopify/Collection/5',
    handle: 'gift-hampers',
    title: 'Gift Hampers',
    description: 'Share the gift of health with our beautifully curated gift boxes. Perfect for festivals, corporate gifting, and special occasions.',
    image: createMockImage(COLLECTION_IMAGES.giftHampers, 'Gift Hampers Collection'),
    products: mockProducts.filter(p =>
      p.tags.some(t => ['Gift', 'Bundle', 'Premium Gift', 'Corporate', 'Value Pack'].includes(t))
    ),
  },
  {
    id: 'gid://shopify/Collection/6',
    handle: 'bestsellers',
    title: 'Bestsellers',
    description: 'Our most loved products, chosen by thousands of happy customers. Start your healthy snacking journey here.',
    image: createMockImage(COLLECTION_IMAGES.bestsellers, 'Bestsellers Collection'),
    products: mockProducts.filter(p => p.tags.includes('Bestseller')),
  },
  {
    id: 'gid://shopify/Collection/7',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Fresh additions to our healthy snacks family. Be the first to try our latest innovations.',
    image: createMockImage(COLLECTION_IMAGES.newArrivals, 'New Arrivals Collection'),
    products: mockProducts.slice(0, 4), // First 4 products as "new arrivals"
  },
];

// Helper functions
export function getMockCollections(): Collection[] {
  return mockCollections;
}

export function getMockCollectionByHandle(handle: string): Collection | undefined {
  return mockCollections.find(c => c.handle === handle);
}

export function getMockFeaturedCollections(count: number = 4): Collection[] {
  // Return main shopping categories (not bestsellers/new arrivals)
  return mockCollections.filter(c =>
    !['bestsellers', 'new-arrivals'].includes(c.handle)
  ).slice(0, count);
}
