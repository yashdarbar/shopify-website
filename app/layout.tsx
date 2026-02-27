import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { AnnouncementBar } from '@/components/cms/AnnouncementBar';

const oswald = Oswald({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Welwach | Snack Smart, Live Better',
  description: 'Discover healthy, delicious snacks made with 100% natural ingredients. No preservatives, no added sugar. Protein snacks, millet munchies, guilt-free sweets & more.',
  keywords: ['healthy snacks', 'protein snacks', 'millet snacks', 'no sugar', 'natural ingredients', 'Welwach'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} antialiased font-sans`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
          </div>
          <MobileBottomNav />
          <CartDrawer />
          <QuickViewModal />
        </Providers>
      </body>
    </html>
  );
}
