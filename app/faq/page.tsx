import { Metadata } from 'next';
import Link from 'next/link';
import { getMockFAQItems } from '@/lib/mock-data';
import { FAQAccordion } from '@/components/FAQAccordion';
import { MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQs | NutriBites',
  description: 'Find answers to frequently asked questions about NutriBites products, shipping, returns, and more.',
};

export default function FAQPage() {
  const faqItems = getMockFAQItems();

  // Group FAQs by category
  const categories = [...new Set(faqItems.map((item) => item.category))];
  const groupedFAQs = categories.map((category) => ({
    category,
    items: faqItems.filter((item) => item.category === category),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-brown-light max-w-2xl mx-auto">
            Find quick answers to common questions about our products, shipping, and more.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {groupedFAQs.map((group) => (
          <div key={group.category} className="mb-12">
            <h2 className="text-xl font-bold font-heading text-primary mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {group.category}
            </h2>
            <FAQAccordion items={group.items} />
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="mt-16 p-8 bg-primary text-white rounded-2xl text-center">
          <MessageCircle className="h-12 w-12 mx-auto mb-4 text-accent" />
          <h3 className="text-2xl font-bold font-heading mb-2">
            Still Have Questions?
          </h3>
          <p className="text-white/80 mb-6">
            Can't find what you're looking for? We're here to help!
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
