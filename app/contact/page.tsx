import { Metadata } from 'next';
import { getMockContactInfo } from '@/lib/mock-data';
import { ContactForm } from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Welwach',
  description: 'Get in touch with Welwach. We\'re here to help with your orders, product questions, or feedback.',
};

export default function ContactPage() {
  const contactInfo = getMockContactInfo();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary uppercase tracking-wide">
            Get in Touch
          </h1>
          <p className="mt-2 text-muted max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold font-heading text-primary mb-6">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">Phone</p>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-primary">WhatsApp</p>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-green-600 transition-colors"
                  >
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">Address</p>
                  <p className="text-muted">
                    {contactInfo.addressLine1}
                    <br />
                    {contactInfo.addressLine2}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-primary">Business Hours</p>
                  <p className="text-muted whitespace-pre-line">
                    {contactInfo.businessHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-10 p-6 bg-surface rounded-2xl">
              <h3 className="font-semibold font-heading text-primary mb-4">
                Quick Help
              </h3>
              <div className="space-y-2">
                <a
                  href="/faq"
                  className="block text-muted hover:text-accent transition-colors"
                >
                  → Frequently Asked Questions
                </a>
                <a
                  href="/shipping"
                  className="block text-muted hover:text-accent transition-colors"
                >
                  → Shipping Information
                </a>
                <a
                  href="/returns"
                  className="block text-muted hover:text-accent transition-colors"
                >
                  → Returns & Refunds
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold font-heading text-primary mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
