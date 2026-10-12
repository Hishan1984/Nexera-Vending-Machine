import { Link } from 'react-router-dom';
import {
  Sparkles,
  Building2,
  Wrench,
  ArrowRight,
  Check,
  MapPin,
  CreditCard,
  Boxes,
  Server,
  MessageCircle,
  Bike,
  Package,
  Store,
  Fuel,
  GraduationCap,
  Warehouse,
  Car,
  ShoppingBag,
  TrendingUp,
  Ruler,
  Cpu,
  Users,
  Monitor,
  Lightbulb,
  Lock,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const LOCATION_CATEGORIES = [
  {
    name: 'Delivery Ecosystem',
    icon: Package,
    accent: 'bg-cyan-50 text-cyan-600',
    items: [
      { icon: Bike, label: 'Rider Rest Areas', desc: 'Rest and waiting areas where riders gather between deliveries.' },
      { icon: Boxes, label: 'Delivery Pickup Zones', desc: 'Pickup zones with consistent motorcycle and rider traffic.' },
      { icon: Store, label: 'Dark Stores', desc: 'Quick-commerce fulfillment locations with high rider volume.' },
      { icon: ShoppingBag, label: 'Restaurant Clusters', desc: 'F&B clusters with frequent delivery pickup activity.' },
    ],
  },
  {
    name: 'Mobility',
    icon: Bike,
    accent: 'bg-brand-50 text-brand',
    items: [
      { icon: GraduationCap, label: 'Driving Schools', desc: 'Training facilities where helmet hygiene matters.' },
      { icon: Bike, label: 'Motorcycle Training Centres', desc: 'Centres where riders use shared or personal helmets.' },
      { icon: Fuel, label: 'Petrol & Service Stations', desc: 'Service stations with regular motorcycle visits.' },
      { icon: Wrench, label: 'Motorcycle Service Centres', desc: 'Service centres where riders maintain their vehicles.' },
    ],
  },
  {
    name: 'Commercial',
    icon: Building2,
    accent: 'bg-navy text-white',
    items: [
      { icon: Store, label: 'Convenience Stores', desc: 'Retail locations frequented by riders during shifts.' },
      { icon: Car, label: 'Commercial Parking', desc: 'Parking facilities serving motorcycle and delivery riders.' },
      { icon: ShoppingBag, label: 'Shopping Areas', desc: 'Commercial areas with mixed rider and visitor traffic.' },
    ],
  },
  {
    name: 'Logistics',
    icon: Warehouse,
    accent: 'bg-cyan-50 text-cyan-600',
    items: [
      { icon: Warehouse, label: 'Warehouses', desc: 'Warehouse facilities with high rider and driver activity.' },
      { icon: Boxes, label: 'Distribution Hubs', desc: 'Distribution centres with consistent delivery traffic.' },
      { icon: Server, label: 'Fleet Facilities', desc: 'Fleet operator facilities managing delivery vehicles and riders.' },
    ],
  },
];

const COMMERCIAL_MODELS = [
  {
    icon: TrendingUp,
    tag: 'Revenue Sharing',
    heading: 'Earn Together',
    desc: 'Nexera Smart installs the CXH01 machine at your approved location and both parties participate in the generated service revenue according to the agreed commercial arrangement.',
    points: [
      'Nexera installs and maintains the machine at your location',
      'Service revenue is shared according to an agreed structure',
      'Both parties benefit from the generated commercial activity',
      'Suitable for locations with strong, consistent rider footfall',
    ],
    cta: 'Discuss Revenue Sharing',
  },
  {
    icon: Building2,
    tag: 'Space Rental',
    heading: 'Rent Us a Small Space',
    desc: 'For locations that prefer a fixed commercial arrangement, Nexera Smart can discuss rental of a suitable placement area for the machine under agreed rental terms.',
    points: [
      'Fixed rental arrangement for the placement area',
      'Simple, predictable commercial terms',
      'Nexera operates the machine independently',
      'Suitable for property owners who prefer a straightforward arrangement',
    ],
    cta: 'Offer a Location',
  },
  {
    icon: Wrench,
    tag: 'Machine Supply',
    heading: 'Operate Your Own Solution',
    desc: 'Businesses, fleets and organizations interested in operating their own helmet-cleaning solution can contact Nexera Smart to discuss machine supply and tailored commercial arrangements.',
    points: [
      'Own and operate the CXH01 directly',
      'Tailored commercial terms for machine supply',
      'Suitable for fleets, logistics operators and organizations',
      'Enquire about availability and configuration options',
    ],
    cta: 'Request Machine Information',
  },
];

const PROPERTY_BENEFITS = [
  { icon: Sparkles, title: 'New Amenity', desc: 'Introduce a useful service designed for motorcycle and delivery riders visiting your location.' },
  { icon: CreditCard, title: 'Revenue Opportunity', desc: 'Create an additional commercial opportunity from suitable underutilized space.' },
  { icon: Ruler, title: 'Compact Footprint', desc: 'Machine dimensions of approximately 620 × 620 × 1780 mm — only about 0.38 m² of floor area.' },
  { icon: Cpu, title: 'Automated Technology', desc: 'The self-service model can operate without requiring dedicated host-location staff.' },
];

const TECH_POINTS = [
  { icon: Monitor, label: '15.6" Touch Screen' },
  { icon: Lightbulb, label: 'LED Operation Indicators' },
  { icon: Lock, label: 'Electronic Door Control' },
  { icon: CreditCard, label: 'Flexible Payments' },
  { icon: Server, label: 'IoT Infrastructure' },
  { icon: Cpu, label: 'Connected Smart Design' },
];

export default function PartnerWithUs() {
  useSeo({
    title: 'Partner With Nexera Smart | Helmet Cleaning Machine Partnerships Dubai',
    description:
      'Partner with Nexera Smart to turn your high-traffic location into a smart rider amenity. Revenue sharing, space rental or machine supply models available across Dubai.',
    path: '/partner-with-us',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Partner With Us', item: `${SITE_URL}/partner-with-us` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      {/* Hero */}
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
            PARTNER WITH US
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Turn Your Space Into a Smart Rider Amenity
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Nexera Smart partners with commercial property owners, operators and businesses that
            have strong motorcycle or delivery-rider footfall. Our CXH01 machine can add a useful
            self-service facility while creating an additional commercial opportunity for the host
            location.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-location" className="btn-primary">
              Submit Your Location
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={COMPANY.whatsappPartnershipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="h-5 w-5" />
              Discuss a Location
            </a>
          </div>
        </div>
      </section>

      {/* Ideal Location Categories */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="IDEAL LOCATIONS"
            heading="Where Nexera Works Best"
            subheading="The CXH01 is designed for locations with significant motorcycle and delivery-rider activity. We categorize suitable locations into four groups."
          />
          <div className="mt-12 space-y-10">
            {LOCATION_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.accent}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">{cat.name}</h3>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.items.map((item) => (
                    <div key={item.label} className="card card-hover flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-navy">{item.label}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-navy/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Models — Detailed */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="COMMERCIAL MODELS"
            heading="Three Ways to Work With Nexera Smart"
            subheading="Choose the commercial arrangement that best fits your location and business preference."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {COMMERCIAL_MODELS.map((model) => (
              <div key={model.heading} className="card card-hover flex flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
                  <model.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-600">{model.tag}</div>
                <h3 className="mt-1 text-lg font-bold text-navy">{model.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/70">{model.desc}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {model.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy/80">
                      <Check className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/submit-location" className="btn-secondary w-full !py-2.5 text-sm">
                    {model.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Property Owners Should Partner */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="FOR PROPERTY OWNERS"
            heading="A Small Footprint. A Smarter Commercial Opportunity."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_BENEFITS.map((card) => (
              <div key={card.title} className="card card-hover text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-sm font-bold tracking-wide text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Design highlights */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SMART DESIGN"
            heading="Connected Technology Behind Every Machine"
            subheading="The CXH01 integrates connectivity and self-service convenience designed for modern commercial locations."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {TECH_POINTS.map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-white px-4 py-3.5 shadow-soft">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-navy">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works teaser */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-cloud-100 px-6 py-10 text-center sm:px-10">
            <Users className="mx-auto h-10 w-10 text-brand" />
            <h2 className="mt-4 text-xl font-bold text-navy sm:text-2xl">
              How Does the Partnership Work?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
              The process is straightforward: you propose your location, we assess suitability
              together, agree the commercial arrangement, and — if suitable — Nexera Smart
              installs the CXH01 and supports ongoing operation.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/submit-location" className="btn-primary">
                Submit Location for Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/how-it-works" className="btn-secondary">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Site assessment note */}
      <section className="bg-cloud-100 pb-16 lg:pb-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-xl bg-white px-5 py-4 shadow-soft">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand mt-0.5" />
              <p className="text-xs leading-relaxed text-navy/60">
                Final installation requirements, operating clearances, utilities, site suitability
                and commercial arrangements are subject to site assessment and agreement. Not all
                proposed locations may be suitable for installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
