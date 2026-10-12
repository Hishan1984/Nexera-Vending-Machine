import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Droplets,
  ThermometerSun,
  Monitor,
  ArrowRight,
  Check,
  MessageCircle,
  Fuel,
  Store,
  GraduationCap,
  Package,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const BENEFITS = [
  { icon: ShieldCheck, title: 'Steam + UVC Disinfection', desc: 'High-temperature steam and UVC technology work together as part of the helmet sanitation process in every cycle.' },
  { icon: Droplets, title: 'Atomized Cleaning', desc: 'Automated disinfectant mist is distributed evenly through the cleaning compartment.' },
  { icon: ThermometerSun, title: 'Heated-Air Drying', desc: 'Circulating heated airflow helps the helmet dry efficiently after cleaning.' },
  { icon: Monitor, title: '15.6" Touchscreen', desc: 'A full-color touch screen guides riders through service selection with a clear interface.' },
];

const USE_CASES = [
  { icon: Store, label: 'Convenience Stores', desc: 'Retail locations frequented by riders during delivery shifts.' },
  { icon: Fuel, label: 'Petrol Stations', desc: 'Service stations with regular motorcycle traffic.' },
  { icon: GraduationCap, label: 'Driving Schools', desc: 'Training facilities where shared helmets are used.' },
  { icon: Package, label: 'Delivery Hubs', desc: 'Pickup zones and dark stores with high rider volume.' },
];

export default function HelmetCleaningMachineDubai() {
  useSeo({
    title: 'Helmet Cleaning Machine Dubai | Nexera Smart CXH01',
    description:
      'Looking for a helmet cleaning machine in Dubai? The Nexera Smart CXH01 offers automated helmet cleaning, disinfection, drying and fragrance dispensing for commercial locations across Dubai.',
    path: '/helmet-cleaning-machine-dubai',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Cleaning Machine Dubai', item: `${SITE_URL}/helmet-cleaning-machine-dubai` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-14 text-white lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(50% 70% at 90% 20%, rgba(0,191,216,0.35) 0%, transparent 60%), radial-gradient(40% 60% at 10% 90%, rgba(8,118,217,0.30) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container-7xl relative text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
            DUBAI HELMET CLEANING MACHINE
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Cleaning Machine in Dubai
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            The Nexera Smart CXH01 is an automated helmet cleaning, disinfection, drying and
            refreshing machine designed for high-traffic commercial locations across Dubai. A
            self-service amenity built for the city's growing motorcycle and delivery-rider
            community.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-location" className="btn-primary">
              Submit Your Location
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={COMPANY.whatsappGeneralUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-navy/80">
            <p>
              Dubai's roads host one of the world's most active delivery and motorcycle communities.
              Thousands of riders navigate the city daily, often wearing helmets for extended
              periods in high temperatures. The Nexera Smart CXH01 helmet cleaning machine provides
              a practical self-service solution that helps riders maintain helmet hygiene while
              creating a commercial opportunity for property owners.
            </p>
            <p>
              The CXH01 combines steam-based cleaning, UVC disinfection, atomized disinfectant spray,
              heated-air drying and fragrance dispensing in a single connected machine. With
              integrated 4G, Wi-Fi and IoT connectivity, it is built for modern commercial
              environments where reliability and self-service convenience matter.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="KEY BENEFITS"
            heading="Why Choose the CXH01 in Dubai"
            subheading="A complete self-service helmet care experience designed for the Dubai climate and commercial environment."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="WHERE IT WORKS"
            heading="Suitable Locations Across Dubai"
            subheading="From Deira to Business Bay, the CXH01 is designed for locations with significant motorcycle and delivery-rider activity."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((u) => (
              <div key={u.label} className="card card-hover flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                  <u.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{u.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/60">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/locations" className="btn-secondary">
              See All Ideal Locations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Built for Dubai's Climate</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              Dubai's high temperatures and humidity make helmet hygiene a genuine comfort and
              health concern for riders. The CXH01's heated-air drying and disinfection process is
              specifically relevant for riders who wear helmets for long shifts in challenging
              conditions.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Designed for sheltered or indoor commercial locations',
                'Disinfection process relevant for shared or personal helmets',
                'Compact 0.38 m² footprint fits small commercial spaces',
                'Flexible payment options including QR code and cards',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-navy/80">
                  <Check className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/helmet-cleaning-machine" className="btn-primary">
                Full CXH01 Specifications
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/partner-with-us" className="btn-secondary">
                Partnership Models
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Bring a Helmet Cleaning Machine to Your Dubai Location"
        text="Submit your location for assessment and join the network of commercial partners offering smart rider amenities across Dubai."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Location"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
