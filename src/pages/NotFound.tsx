import { Link } from 'react-router-dom';
import { Home, ArrowRight, Search, MessageCircle, Bike, Handshake, MapPin } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { COMPANY } from '@/lib/constants';

const QUICK_LINKS = [
  { to: '/helmet-cleaning-machine', label: 'CXH01 Helmet Cleaning Machine', icon: Bike },
  { to: '/partner-with-us', label: 'Partner With Us', icon: Handshake },
  { to: '/locations', label: 'Ideal Locations', icon: MapPin },
  { to: '/contact', label: 'Contact Us', icon: MessageCircle },
];

export default function NotFound() {
  useSeo({
    title: 'Page Not Found | Nexera Smart',
    description: 'The page you are looking for could not be found. Browse our key pages or contact Nexera Smart for assistance.',
    path: '/404',
    robots: 'noindex, follow',
  });

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-cloud-100 py-20">
      <div className="container-7xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cloud-200 text-navy">
          <Search className="h-8 w-8" />
        </div>
        <p className="mt-6 text-7xl font-bold gradient-text sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">Page Not Found</h1>
        <p className="mt-4 mx-auto max-w-md text-base text-navy/70">
          The page you are looking for doesn't exist or has been moved. Try one of these pages
          instead.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <a href={COMPANY.whatsappGeneralUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-white px-5 py-4 shadow-soft transition-all hover:border-brand/30 hover:shadow-card-hover"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                <link.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-navy">{link.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-navy/40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
