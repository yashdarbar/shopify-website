import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'Bestsellers', href: '/collections/bestsellers' },
    { name: 'Protein Snacks', href: '/collections/protein-snacks' },
    { name: 'Millet Munchies', href: '/collections/millet-munchies' },
    { name: 'Gift Hampers', href: '/collections/gift-hampers' },
  ],
  company: [
    { name: 'Our Story', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Track Order', href: '/track-order' },
  ],
  support: [
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Return Policy', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/nutribites_official' },
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/nutribitesofficial' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/nutribites' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/NutriBitesIndia' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-heading mb-2 uppercase tracking-wide">
              Join the NutriBites Family
            </h3>
            <p className="text-white/90 mb-6">
              Get 10% off your first order + exclusive recipes and health tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <Button variant="secondary" size="lg" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-bold font-heading tracking-wide">
                  NUTRI<span className="text-accent">BITES</span>
                </span>
              </Link>
              <p className="mt-2 text-sm text-white/60 italic">Snack Smart, Live Better</p>
              <p className="mt-4 text-white/50 text-sm">
                100% natural ingredients, no preservatives, no added sugar. Healthy snacking made delicious.
              </p>
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-white/50 hover:text-accent transition-colors"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-white/60">
                <a href="mailto:hello@nutribites.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4" />
                  hello@nutribites.com
                </a>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </a>
              </div>
              <p className="text-sm text-white/40">
                © {new Date().getFullYear()} NutriBites Foods Pvt. Ltd. All rights reserved.
              </p>
            </div>
            {/* Payment Methods */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
              <span>We Accept:</span>
              <span className="flex items-center gap-2">
                <span className="px-2 py-1 bg-white/10 rounded">Visa</span>
                <span className="px-2 py-1 bg-white/10 rounded">Mastercard</span>
                <span className="px-2 py-1 bg-white/10 rounded">UPI</span>
                <span className="px-2 py-1 bg-white/10 rounded">COD</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
