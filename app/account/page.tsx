import { Metadata } from 'next';
import Link from 'next/link';
import { User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Account | Welwach',
  description: 'Manage your Welwach account',
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold font-heading text-primary mb-4">
            My Account
          </h1>

          <p className="text-muted mb-8">
            Account features are coming soon. Stay tuned for order tracking, wishlists, and more.
          </p>

          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
