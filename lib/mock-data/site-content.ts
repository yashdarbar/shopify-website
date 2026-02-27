// Mock site content data (CMS content that would come from Shopify Metaobjects)

// Types for CMS content
export interface HeroBanner {
  id: string;
  headline: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: 'light' | 'dark';
  order: number;
  isActive: boolean;
}

export interface TrustBadge {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  imageUrl: string; // Background image URL
  order: number;
}

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  reviewText: string;
  customerImage?: string;
  productHandle?: string;
  isFeatured: boolean;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface PageContent {
  pageIdentifier: string;
  headline: string;
  content: string;
  featuredImage?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  announcementBarText: string;
  announcementBarEnabled: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  addressLine1: string;
  addressLine2: string;
  businessHours: string;
  mapEmbedUrl?: string;
}

export interface NewsletterSettings {
  headline: string;
  subtext: string;
  buttonText: string;
  successMessage: string;
}

// Mock Data

export const mockSiteSettings: SiteSettings = {
  siteName: 'Welwach',
  tagline: 'Snack Smart, Live Better',
  announcementBarText: 'Free Shipping on orders above Rs. 499 | Use code FIRST10 for 10% off',
  announcementBarEnabled: true,
};

export const mockHeroBanners: HeroBanner[] = [
  {
    id: '1',
    headline: 'Healthy Never Tasted This Good',
    subtext: '100% Natural Ingredients | No Preservatives | No Added Sugar',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    backgroundImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&h=900&fit=crop',
    backgroundColor: '#F5E6D3',
    textColor: 'dark',
    order: 1,
    isActive: true,
  },
  {
    id: '2',
    headline: 'Protein-Packed Snacks',
    subtext: 'Fuel your fitness journey the delicious way',
    buttonText: 'Explore Protein Range',
    buttonLink: '/collections/protein-snacks',
    backgroundImage: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1600&h=900&fit=crop',
    backgroundColor: '#2D5A4A',
    textColor: 'light',
    order: 2,
    isActive: true,
  },
  {
    id: '3',
    headline: 'Festival Special Hampers',
    subtext: 'Gift health to your loved ones',
    buttonText: 'Shop Gifts',
    buttonLink: '/collections/gift-hampers',
    backgroundImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1600&h=900&fit=crop',
    backgroundColor: '#E87B35',
    textColor: 'light',
    order: 3,
    isActive: true,
  },
];

export const mockTrustBadges: TrustBadge[] = [
  {
    id: '1',
    title: '100% Natural',
    icon: 'Leaf',
    description: 'Made with pure, natural ingredients',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    order: 1,
  },
  {
    id: '2',
    title: 'No Preservatives',
    icon: 'ShieldCheck',
    description: 'Free from artificial preservatives',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    order: 2,
  },
  {
    id: '3',
    title: 'Vegan Options',
    icon: 'Sprout',
    description: 'Plant-based choices available',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    order: 3,
  },
  {
    id: '4',
    title: 'High Protein',
    icon: 'Dumbbell',
    description: 'Protein-packed for fitness',
    imageUrl: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&h=400&fit=crop',
    order: 4,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    reviewText: 'Finally found snacks I can eat guilt-free! The protein balls are my post-gym essential.',
    isFeatured: true,
    order: 1,
  },
  {
    id: '2',
    customerName: 'Rahul Verma',
    location: 'Delhi',
    rating: 5,
    reviewText: "My kids love the Jowar Puffs. Happy that they're eating healthy without even knowing it!",
    isFeatured: true,
    order: 2,
  },
  {
    id: '3',
    customerName: 'Anita Krishnan',
    location: 'Bangalore',
    rating: 4,
    reviewText: 'The Date Laddoos taste just like homemade. Great for diabetic-friendly gifting.',
    isFeatured: true,
    order: 3,
  },
  {
    id: '4',
    customerName: 'Vikram Singh',
    location: 'Pune',
    rating: 5,
    reviewText: "Ordered the starter box to try. Now I'm a monthly subscriber. Absolutely love it!",
    isFeatured: true,
    order: 4,
  },
  {
    id: '5',
    customerName: 'Meera Patel',
    location: 'Ahmedabad',
    rating: 5,
    reviewText: "Best healthy snacks brand I've tried. The makhana is addictive and guilt-free!",
    isFeatured: true,
    order: 5,
  },
];

export const mockFAQItems: FAQItem[] = [
  {
    id: '1',
    question: 'What is the shelf life of your products?',
    answer: 'All our products have a shelf life of 3-6 months from the date of manufacture. Check the packaging for specific dates.',
    category: 'Products',
    order: 1,
  },
  {
    id: '2',
    question: 'Are your products suitable for diabetics?',
    answer: 'Most of our products are made without added sugar and use natural sweeteners like dates and jaggery. However, please consult your doctor before consumption.',
    category: 'Products',
    order: 2,
  },
  {
    id: '3',
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship only within India. International shipping coming soon!',
    category: 'Shipping',
    order: 3,
  },
  {
    id: '4',
    question: 'What is your return policy?',
    answer: 'We accept returns within 7 days of delivery for unopened products. Contact us at hello@welwach.com for assistance.',
    category: 'Shipping',
    order: 4,
  },
  {
    id: '5',
    question: 'Are your products vegan?',
    answer: 'Many of our products are 100% vegan. Look for the "Vegan" tag on product pages.',
    category: 'Products',
    order: 5,
  },
  {
    id: '6',
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order from your account dashboard.',
    category: 'Shipping',
    order: 6,
  },
];

export const mockPageContent: Record<string, PageContent> = {
  about_us: {
    pageIdentifier: 'about_us',
    headline: 'Our Story',
    content: `At Welwach, we believe healthy eating shouldn't mean compromising on taste.

Founded in 2023, we started with a simple mission: create snacks that are as delicious as they are nutritious. Every product is crafted with 100% natural ingredients, no preservatives, and no added sugar.

**Our Promise:**
- Sourced from trusted Indian farms
- Made in small batches for freshness
- Lab-tested for quality
- Eco-friendly packaging

Join over 50,000+ happy snackers who've made the switch to smarter snacking.`,
    featuredImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
  },
  contact: {
    pageIdentifier: 'contact',
    headline: 'Get in Touch',
    content: `We'd love to hear from you! Whether you have a question about our products, need help with an order, or just want to say hello, we're here to help.`,
    featuredImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=800&fit=crop',
  },
};

export const mockContactInfo: ContactInfo = {
  email: 'hello@welwach.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  addressLine1: 'Welwach Foods Pvt. Ltd.',
  addressLine2: '123, Health Street, Andheri West, Mumbai - 400058, Maharashtra',
  businessHours: 'Monday - Saturday: 9 AM - 6 PM\nSunday: Closed',
};

export const mockNewsletterSettings: NewsletterSettings = {
  headline: 'Join the Welwach Family',
  subtext: 'Get 10% off your first order + exclusive recipes',
  buttonText: 'Subscribe',
  successMessage: "Thanks for subscribing! Check your email for your discount code.",
};

// Mood category type
export interface MoodCategory {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  description: string;
  slug: string;
  color: string;
}

// Shop by Mood categories (Mix of Taste + Occasion)
export const mockMoodCategories: MoodCategory[] = [
  // Taste-based moods
  {
    id: 'spicy',
    name: 'Spicy',
    icon: 'Flame',
    description: 'Bold & fiery flavors',
    slug: 'spicy',
    color: '#EF4444',
  },
  {
    id: 'sweet',
    name: 'Sweet',
    icon: 'Candy',
    description: 'Guilt-free sweetness',
    slug: 'sweet',
    color: '#EC4899',
  },
  {
    id: 'cheesy',
    name: 'Cheesy',
    icon: 'Pizza',
    description: 'Cheesy goodness',
    slug: 'cheesy',
    color: '#F59E0B',
  },
  {
    id: 'tangy',
    name: 'Tangy',
    icon: 'Citrus',
    description: 'Zesty & refreshing',
    slug: 'tangy',
    color: '#84CC16',
  },
  // Occasion-based moods
  {
    id: 'fitness',
    name: 'Fitness',
    icon: 'Dumbbell',
    description: 'Pre & post workout',
    slug: 'fitness',
    color: '#3B82F6',
  },
  {
    id: 'party',
    name: 'Party',
    icon: 'PartyPopper',
    description: 'Guilt-free party snacks',
    slug: 'party',
    color: '#8B5CF6',
  },
  {
    id: 'work',
    name: 'Work Snacks',
    icon: 'Coffee',
    description: 'Desk-friendly munchies',
    slug: 'work',
    color: '#6B7280',
  },
  {
    id: 'kids',
    name: 'Kids',
    icon: 'Smile',
    description: 'Healthy treats kids love',
    slug: 'kids',
    color: '#10B981',
  },
];

// Helper functions
export function getMockSiteSettings(): SiteSettings {
  return mockSiteSettings;
}

export function getMockHeroBanners(): HeroBanner[] {
  return mockHeroBanners.filter(b => b.isActive).sort((a, b) => a.order - b.order);
}

export function getMockTrustBadges(): TrustBadge[] {
  return mockTrustBadges.sort((a, b) => a.order - b.order);
}

export function getMockTestimonials(featuredOnly: boolean = false): Testimonial[] {
  const testimonials = featuredOnly
    ? mockTestimonials.filter(t => t.isFeatured)
    : mockTestimonials;
  return testimonials.sort((a, b) => a.order - b.order);
}

export function getMockFAQItems(category?: string): FAQItem[] {
  const items = category
    ? mockFAQItems.filter(f => f.category === category)
    : mockFAQItems;
  return items.sort((a, b) => a.order - b.order);
}

export function getMockPageContent(identifier: string): PageContent | undefined {
  return mockPageContent[identifier];
}

export function getMockContactInfo(): ContactInfo {
  return mockContactInfo;
}

export function getMockNewsletterSettings(): NewsletterSettings {
  return mockNewsletterSettings;
}

export function getMockMoodCategories(): MoodCategory[] {
  return mockMoodCategories;
}
