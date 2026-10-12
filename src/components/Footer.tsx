import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin, Mail, Download, ArrowRight } from 'lucide-react';
import { ASSETS, COMPANY, DOWNLOADS } from '@/lib/constants';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/helmet-cleaning-machine', label: 'CXH01 Machine' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/for-riders', label: 'For Riders' },
  { to: '/partner-with-us', label: 'Partner With Us' },
  { to: '/submit-location', label: 'Submit Location' },
  { to: '/locations', label: 'Ideal Locations' },
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/sitemap', label: 'Sitemap' },
];

const SOLUTION_LINKS = [
  { to: '/helmet-cleaning-machine-dubai', label: 'Helmet Cleaning Dubai' },
  { to: '/helmet-sanitizer-machine-dubai', label: 'Helmet Sanitizer Machine' },
  { to: '/delivery-rider-helmet-cleaning', label: 'Delivery Rider Cleaning' },
  { to: '/helmet-cleaning-machine-for-driving-schools', label: 'Driving Schools Solution' },
  { to: '/helmet-cleaning-machine-for-petrol-stations', label: 'Petrol & Service Stations' },
  { to: '/helmet-cleaning-machine-for-delivery-hubs', label: 'Delivery & Logistics Hubs' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-7xl py-14 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand + description */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center" aria-label="Nexera Smart home">
              <img
                src={ASSETS.logo}
                alt="Nexera Smart logo"
                className="h-10 w-auto brightness-0 invert"
                width={180}
                height={40}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              {COMPANY.legalName} — a Dubai-based smart vending and automated solutions company
              focused on practical self-service technologies for high-footfall commercial locations.
            </p>
            <p className="mt-4 text-sm font-semibold text-cyan-300">{COMPANY.tagline}</p>

            {/* Downloads */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={DOWNLOADS.brochureUrl}
                download="Nexera-Smart-CXH01-Brochure.pdf"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-cyan-300"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                Download CXH01 Brochure (PDF)
              </a>
              <a
                href={DOWNLOADS.companyProfileUrl}
                download="Nexera-Smart-Company-Profile.pdf"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/80 transition-colors hover:text-cyan-300"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                Download Company Profile (PDF)
              </a>
            </div>
          </div>

          {/* Quick Navigation links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Navigation</h2>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 transition-colors hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industry Solutions / Programmatic SEO links */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Dubai Solutions</h2>
            <ul className="mt-5 space-y-2.5">
              {SOLUTION_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-cyan-300"
                  >
                    <ArrowRight className="h-3 w-3 text-cyan-400/80" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Dubai Office</h2>
            <ul className="mt-5 space-y-3.5 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-cyan-300" />
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex gap-3 transition-colors hover:text-cyan-300"
                >
                  <Phone className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 transition-colors hover:text-cyan-300"
                >
                  <MessageCircle className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span>WhatsApp: {COMPANY.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex gap-3 transition-colors hover:text-cyan-300"
                >
                  <Mail className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs leading-relaxed text-white/50">
            © 2026 {COMPANY.legalName}. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/50">
            <Link to="/privacy-policy" className="hover:text-cyan-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-cyan-300">Terms of Service</Link>
            <span>•</span>
            <Link to="/sitemap" className="hover:text-cyan-300">HTML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
