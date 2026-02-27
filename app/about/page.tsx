import { Metadata } from 'next';
import Image from 'next/image';
import { getMockPageContent, getMockTrustBadges } from '@/lib/mock-data';
import { TrustBadges } from '@/components/cms/TrustBadges';
import { Leaf, Users, Award, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | Welwach',
  description: 'Learn about Welwach - our mission to make healthy snacking delicious. 100% natural ingredients, no preservatives, made with love.',
};

const promises = [
  {
    icon: Leaf,
    title: 'Sourced from Trusted Indian Farms',
    description: 'We partner directly with local farmers to source the freshest, highest-quality ingredients.',
  },
  {
    icon: Users,
    title: 'Made in Small Batches',
    description: 'Each product is crafted in small batches to ensure maximum freshness and quality.',
  },
  {
    icon: Award,
    title: 'Lab-Tested for Quality',
    description: 'Every batch undergoes rigorous quality testing to meet our high standards.',
  },
  {
    icon: Heart,
    title: 'Eco-Friendly Packaging',
    description: 'We use sustainable, recyclable packaging because we care about our planet.',
  },
];

export default function AboutPage() {
  const content = getMockPageContent('about_us');
  const trustBadges = getMockTrustBadges();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary text-white">
        {content?.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={content.featuredImage}
              alt="Our Story"
              fill
              className="object-cover opacity-20"
            />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
            Our Story
          </h1>
          <p className="mt-4 text-xl text-white/80 max-w-2xl mx-auto">
            At Welwach, we believe healthy eating shouldn't mean compromising on taste.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-primary max-w-none">
          <p className="text-xl text-muted leading-relaxed">
            Founded in 2023, we started with a simple mission: create snacks that are as delicious as they are nutritious. Every product is crafted with <strong>100% natural ingredients</strong>, no preservatives, and no added sugar.
          </p>

          <p className="text-muted">
            We understand the struggle of finding healthy snacks that actually taste good. That's why our team of food scientists and culinary experts work tirelessly to develop recipes that satisfy your cravings without compromising your health goals.
          </p>

          <p className="text-muted">
            From protein-packed power balls for fitness enthusiasts to traditional Indian sweets reimagined with natural sweeteners, every Welwach product is a labor of love. We source our ingredients from trusted Indian farms, ensuring freshness and supporting local communities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16 text-center">
          <div>
            <p className="text-4xl font-bold font-heading text-primary">50K+</p>
            <p className="text-muted mt-1">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold font-heading text-primary">15+</p>
            <p className="text-muted mt-1">Products</p>
          </div>
          <div>
            <p className="text-4xl font-bold font-heading text-primary">100%</p>
            <p className="text-muted mt-1">Natural</p>
          </div>
          <div>
            <p className="text-4xl font-bold font-heading text-primary">0</p>
            <p className="text-muted mt-1">Preservatives</p>
          </div>
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-primary text-center mb-12">
            Our Promise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {promises.map((promise, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <promise.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold font-heading text-primary mb-2">
                  {promise.title}
                </h3>
                <p className="text-muted text-sm">{promise.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges badges={trustBadges} />
    </div>
  );
}
