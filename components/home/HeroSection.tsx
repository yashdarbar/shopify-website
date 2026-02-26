import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-4">
              New Collection
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Discover Our
              <br />
              <span className="text-accent">Premium Products</span>
            </h1>
            <p className="mt-4 text-lg text-muted max-w-md mx-auto md:mx-0">
              Handcrafted with love and care. Experience the finest quality products
              made from natural ingredients.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/collections">
                <Button variant="outline" size="lg">
                  View Collections
                </Button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Decorative circles */}
              <div className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-accent/20 absolute animate-pulse" />
              <div className="w-36 h-36 md:w-56 md:h-56 rounded-full bg-primary/10 absolute" />
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-accent/30 absolute" />
            </div>
            {/* Placeholder for hero image - can be customized later */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl md:text-8xl">🛍️</span>
                <p className="mt-2 text-sm text-muted">Add hero image here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{
        clipPath: 'ellipse(70% 100% at 50% 100%)'
      }} />
    </section>
  );
}
