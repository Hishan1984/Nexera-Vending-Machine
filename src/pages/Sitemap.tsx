import { Link } from 'react-router-dom';
import { useSeo, useJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';

const PAGES = [
  { path: '/', label: 'Home', desc: 'Nexera Smart homepage — helmet cleaning machine and smart vending solutions in Dubai.' },
  { path: '/helmet-cleaning-machine', label: 'Helmet Cleaning Machine', desc: 'Full CXH01 product details, features and technical specifications.' },
  { path: '/helmet-cleaning-machine-dubai', label: 'Helmet Cleaning Machine Dubai', desc: 'Helmet cleaning machine for commercial locations across Dubai.' },
  { path: '/helmet-sanitizer-machine-dubai', label: 'Helmet Sanitizer Machine Dubai', desc: 'Helmet sanitizer machine with UVC and disinfectant for Dubai locations.' },
  { path: '/delivery-rider-helmet-cleaning', label: 'Delivery Rider Helmet Cleaning', desc: 'Helmet cleaning solution for delivery riders in Dubai.' },
  { path: '/helmet-cleaning-machine-for-driving-schools', label: 'Helmet Cleaning for Driving Schools', desc: 'Helmet cleaning machine for driving schools and training centres.' },
  { path: '/helmet-cleaning-machine-for-petrol-stations', label: 'Helmet Cleaning for Petrol Stations', desc: 'Helmet cleaning machine for petrol and service stations.' },
  { path: '/helmet-cleaning-machine-for-delivery-hubs', label: 'Helmet Cleaning for Delivery Hubs', desc: 'Helmet cleaning machine for delivery hubs, dark stores and pickup zones.' },
  { path: '/how-it-works', label: 'How It Works', desc: 'The 4-step self-service process for the CXH01 helmet cleaning machine.' },
  { path: '/for-riders', label: 'For Riders', desc: 'Benefits of the Nexera Smart helmet cleaning machine for delivery and motorcycle riders.' },
  { path: '/partner-with-us', label: 'Partner With Us', desc: 'Revenue sharing, space rental and machine supply commercial models.' },
  { path: '/locations', label: 'Ideal Locations', desc: 'Where the CXH01 works best — suitable location types across Dubai.' },
  { path: '/about', label: 'About Us', desc: 'About Nexera Smart and our mission in smart vending and automated solutions.' },
  { path: '/faq', label: 'FAQ', desc: 'Frequently asked questions about the CXH01 and Nexera Smart partnerships.' },
  { path: '/contact', label: 'Contact', desc: 'Contact Nexera Smart and submit a partnership enquiry.' },
  { path: '/submit-location', label: 'Submit Location', desc: 'Submit your location for a CXH01 helmet cleaning machine assessment.' },
  { path: '/privacy-policy', label: 'Privacy Policy', desc: 'How Nexera Smart collects, uses and protects your information.' },
  { path: '/terms', label: 'Terms & Conditions', desc: 'Terms governing use of the Nexera Smart website.' },
];

export default function Sitemap() {
  useSeo({
    title: 'Sitemap | Nexera Smart',
    description: 'Complete sitemap of the Nexera Smart website — all pages and sections.',
    path: '/sitemap',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Sitemap', item: `${SITE_URL}/sitemap` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">SITEMAP</span>
          <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">Website Sitemap</h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            A complete list of all pages on the Nexera Smart website.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-4xl">
            <ul className="grid gap-4 sm:grid-cols-2">
              {PAGES.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="block rounded-xl border border-cloud-300/60 bg-white p-5 shadow-soft transition-all hover:border-brand/30 hover:shadow-card-hover"
                  >
                    <span className="text-base font-semibold text-navy group-hover:text-brand">{page.label}</span>
                    <span className="mt-1 block text-sm text-navy/60">{page.desc}</span>
                    <span className="mt-2 block text-xs font-medium text-brand">{page.path === '/' ? SITE_URL : `${SITE_URL}${page.path}`}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
