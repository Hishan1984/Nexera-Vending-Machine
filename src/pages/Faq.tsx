import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import CtaBanner from '@/components/CtaBanner';

const FAQS = [
  {
    q: 'What is the Nexera CXH01?',
    a: 'The Nexera Smart CXH01 is an automated helmet cleaning machine designed for self-service use in high-traffic commercial locations. It combines cleaning, disinfection, drying and fragrance dispensing in a single connected machine.',
  },
  {
    q: 'How does the helmet cleaning machine work?',
    a: 'A rider selects a service on the 15.6-inch touchscreen, places the helmet inside the cleaning compartment, and the machine performs an automated cycle that may include steam, UVC, atomized disinfectant spray, heated-air drying and fragrance dispensing depending on the selected configuration.',
  },
  {
    q: 'How long does helmet cleaning take?',
    a: 'Cycle time depends on the selected service configuration. Contact Nexera Smart for the current machine program and operating details.',
  },
  {
    q: 'What cleaning technology does the machine use?',
    a: 'The CXH01 is designed to support helmet sanitation using high-temperature steam and UVC technology, combined with atomized disinfectant spray and circulating heated airflow for drying.',
  },
  {
    q: 'Does the machine provide drying?',
    a: 'Yes. The CXH01 includes circulating heated airflow designed to support efficient drying after the cleaning cycle.',
  },
  {
    q: 'Does the machine add fragrance?',
    a: 'Yes. The machine includes a built-in scent dispensing function to help leave the helmet feeling refreshed after cleaning.',
  },
  {
    q: 'What payment methods can be supported?',
    a: 'The CXH01 supports QR code, coins, credit cards and banknotes depending on machine configuration. Available payment options may vary by installation.',
  },
  {
    q: 'Does the machine require an operator?',
    a: 'The CXH01 is designed as a self-service machine and can operate without requiring dedicated host-location staff.',
  },
  {
    q: 'What type of locations are suitable?',
    a: 'Suitable locations include delivery rider rest areas, delivery pickup and waiting areas, convenience stores, petrol and service stations, driving schools, motorcycle training centres, logistics and warehouses, commercial parking areas, restaurant clusters, dark stores and quick-commerce hubs, motorcycle service centres, and shopping and commercial areas.',
  },
  {
    q: 'How much space does the CXH01 require?',
    a: 'The machine dimensions are approximately 620 × 620 × 1780 mm with a weight of 160 kg. Final installation requirements and operating clearances are subject to site assessment.',
  },
  {
    q: 'Does Nexera offer revenue-sharing partnerships?',
    a: 'Yes. Nexera Smart can install the CXH01 at suitable partner locations under an agreed revenue-sharing model. Both parties benefit according to the agreed commercial structure.',
  },
  {
    q: 'Can Nexera rent space instead?',
    a: 'Yes. For locations that prefer a fixed commercial arrangement, Nexera Smart can discuss rental of a suitable placement area for the machine.',
  },
  {
    q: 'Can businesses purchase their own machines?',
    a: 'Yes. Businesses, fleets and organizations interested in operating their own helmet-cleaning solution can contact Nexera Smart to discuss machine supply and tailored commercial arrangements.',
  },
  {
    q: 'How can I propose my location?',
    a: 'You can submit a partnership enquiry through our contact page or reach out via WhatsApp at +971 50 572 1028. We will review your location and get in touch to discuss next steps.',
  },
  {
    q: 'Where is Nexera Smart located?',
    a: 'Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is located at C-03, Al Shindagha, Deira, Dubai, United Arab Emirates.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-cloud-300/60 bg-white shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-navy sm:text-base">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6 animate-slide-down">
          <p className="text-sm leading-relaxed text-navy/70">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  useSeo({
    title: 'FAQ | Nexera Smart Helmet Cleaning Machine Dubai',
    description:
      'Frequently asked questions about the Nexera Smart CXH01 helmet cleaning machine, how it works, payment options, partnerships and locations in Dubai.',
    path: '/faq',
  });

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
    ],
  };
  useJsonLd('ld-faq', faqJsonLd);
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">FAQ</span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            Everything you need to know about the Nexera Smart CXH01 helmet cleaning machine,
            partnerships and locations.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-navy/70">Still have questions?</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Nexera Smart
              </Link>
              <Link to="/partner-with-us" className="btn-secondary">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
