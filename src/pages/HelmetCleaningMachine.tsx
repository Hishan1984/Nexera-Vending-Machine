import { Link } from 'react-router-dom';
import {
  Flame,
  Droplets,
  ThermometerSun,
  Sparkles,
  Wifi,
  Monitor,
  Lightbulb,
  CreditCard,
  Lock,
  Server,
  ArrowRight,
  Check,
  Ruler,
  Weight,
  Maximize2,
  MessageCircle,
  Cpu,
  PlayCircle,
  ArrowDownToLine,
  Bike,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { ASSETS, COMPANY, SITE_URL } from '@/lib/constants';
import MachineImage from '@/components/MachineImage';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const FEATURES = [
  { icon: Monitor, title: 'Touchscreen Interface', desc: 'A 15.6-inch full-color touch screen guides the rider through service selection with a clear, intuitive interface.' },
  { icon: Flame, title: 'Steam + UVC Disinfection', desc: 'Combines high-temperature steam and UVC technology as part of the helmet sanitation process.' },
  { icon: Droplets, title: 'Atomized Cleaning', desc: 'Automated disinfectant mist is distributed through the cleaning compartment.' },
  { icon: ThermometerSun, title: 'Heated-Air Drying', desc: 'Circulating heated airflow supports efficient drying after cleaning.' },
  { icon: Sparkles, title: 'Fresh Fragrance', desc: 'Built-in scent dispensing helps leave the helmet feeling refreshed after each cycle.' },
  { icon: Wifi, title: 'Smart Connectivity', desc: 'Integrated 4G, Wi-Fi and IoT connectivity supports smart machine operations.' },
  { icon: CreditCard, title: 'Flexible Payments', desc: 'Supports QR code, coins, credit cards and banknotes depending on machine configuration.' },
  { icon: Lock, title: 'Electronic Door Control', desc: 'Electronically controlled door secures the compartment during the cleaning cycle.' },
];

const DIMENSIONS = [
  { icon: Ruler, label: 'Dimensions', value: '620 × 620 × 1780 mm', sub: 'Width × Depth × Height' },
  { icon: Weight, label: 'Weight', value: '160 kg', sub: 'Gross machine weight' },
  { icon: Maximize2, label: 'Footprint', value: 'approx. 0.38 m²', sub: 'Compact floor area required' },
];

const SPECS = [
  { label: 'Model', value: 'CXH01' },
  { label: 'Power Supply', value: '110–240V AC' },
  { label: 'Display', value: '15.6-inch full-color touch screen' },
  { label: 'Disinfection', value: 'High-temperature steam + UVC sterilization' },
  { label: 'Cleaning', value: 'Atomized disinfectant spray' },
  { label: 'Drying', value: 'Circulating heat airflow' },
  { label: 'Fragrance', value: 'Built-in scent dispensing function' },
  { label: 'Lighting', value: 'LED interior with operation indicators' },
  { label: 'Speaker', value: '3W stereo sound' },
  { label: 'Payment Options', value: 'QR code, coins, credit cards, banknotes' },
  { label: 'Door Lock', value: 'Electronic control' },
  { label: 'Connectivity', value: 'Integrated 4G / Wi-Fi / IoT module' },
  { label: 'Dimensions', value: '620 × 620 × 1780 mm' },
  { label: 'Weight', value: '160 kg' },
];

const STEPS = [
  { num: '01', icon: Monitor, title: 'Choose Your Service', desc: 'Select the required option using the 15.6-inch touchscreen.' },
  { num: '02', icon: ArrowDownToLine, title: 'Insert Helmet', desc: 'Place the helmet safely inside the designated cleaning compartment.' },
  { num: '03', icon: PlayCircle, title: 'Automatic Cleaning', desc: 'The machine performs the configured automated cleaning, disinfection and drying cycle.' },
  { num: '04', icon: Bike, title: 'Remove & Ride', desc: 'Collect the refreshed helmet and continue your journey.' },
];

const GALLERY_IMAGES = [
  { src: ASSETS.machineInStore, alt: 'CXH01 helmet cleaning machine installed in a commercial convenience store setting', caption: 'In a convenience store environment' },
  { src: ASSETS.machineTouchscreen, alt: 'CXH01 15.6-inch touchscreen interface close-up showing service selection', caption: '15.6-inch touchscreen interface' },
  { src: ASSETS.machineCompartment, alt: 'CXH01 cleaning compartment interior with LED lighting and steam nozzles', caption: 'Interior cleaning compartment' },
];

export default function HelmetCleaningMachine() {
  useSeo({
    title: 'CXH01 Helmet Cleaning Machine Dubai | Nexera Smart',
    description:
      'The Nexera Smart CXH01 is an automated helmet cleaning, disinfection, drying and refreshing machine with 4G/Wi-Fi/IoT connectivity. Full technical specifications, features and real-life product photos.',
    path: '/helmet-cleaning-machine',
  });

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Nexera Smart CXH01 Helmet Cleaning Machine',
    description:
      'Automated helmet cleaning, disinfection, drying and refreshing in one connected self-service machine.',
    brand: { '@type': 'Brand', name: COMPANY.brand },
    manufacturer: { '@type': 'Organization', name: COMPANY.legalName },
    image: [ASSETS.machine, ASSETS.machineInStore, ASSETS.machineTouchscreen, ASSETS.machineCompartment],
    category: 'Helmet Cleaning Machine',
    model: 'CXH01',
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Cleaning Machine', item: `${SITE_URL}/helmet-cleaning-machine` },
    ],
  };

  useJsonLd('ld-product', productJsonLd);
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cloud-100">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="container-7xl relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <span className="eyebrow">PRODUCT</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl text-balance">
              NEXERA CXH01 Helmet Cleaning Machine
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              Automated helmet cleaning, disinfection, drying and refreshing in one connected
              self-service machine. Designed for high-traffic commercial locations across Dubai.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/partner-with-us" className="btn-primary">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={COMPANY.whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp {COMPANY.phone}
              </a>
              <Link to="/contact" className="btn-secondary">
                Request Machine Information
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-navy/50">
              Model CXH01 • 620 × 620 × 1780 mm • 160 kg
            </p>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="absolute inset-0 -z-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,191,216,0.18), transparent 70%)' }}
              aria-hidden="true"
            />
            <MachineImage priority loading="eager" className="relative w-full max-w-[440px] drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Dimension Highlights */}
      <section className="border-y border-cloud-300/60 bg-white">
        <div className="container-7xl py-10 lg:py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            {DIMENSIONS.map((d) => (
              <div key={d.label} className="flex items-center gap-4 rounded-2xl border border-cloud-300/60 bg-cloud-100 px-5 py-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  <d.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">{d.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-navy">{d.value}</p>
                  <p className="text-xs text-navy/50">{d.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="KEY FEATURES"
            heading="Everything in One Connected Machine"
            subheading="Eight core capabilities combine to deliver a complete self-service helmet care experience."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The CXH01 in Real Life */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="IN REAL LIFE"
            heading="The CXH01 in Real Life"
            subheading="See how the CXH01 looks in actual commercial environments — designed to fit seamlessly into high-footfall locations."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => (
              <figure
                key={img.caption}
                className={`group overflow-hidden rounded-2xl border border-cloud-300/60 bg-white shadow-card ${
                  i === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    width={620}
                    height={i === 0 ? 600 : 440}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-5 py-4">
                  <p className="text-sm font-medium text-navy">{img.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/partner-with-us" className="btn-primary">
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Propose Your Location
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            heading="Simple Self-Service in 4 Steps"
            subheading="An intuitive rider experience with no staff involvement required."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="card card-hover h-full">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-3xl font-bold text-cloud-300">{step.num}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/how-it-works" className="btn-primary">
              See How It Works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Design highlights */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl grid items-center gap-12 lg:grid-cols-2">
          <div className="relative flex justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(8,118,217,0.15), transparent 70%)' }}
              aria-hidden="true"
            />
            <MachineImage className="relative w-full max-w-[420px] drop-shadow-xl" />
          </div>
          <div>
            <span className="eyebrow">SMART DESIGN</span>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">Engineered for Self-Service Convenience</h2>
            <p className="mt-4 text-base leading-relaxed text-navy/70">
              The CXH01 is designed to operate as a self-service machine, combining a large
              touchscreen interface, electronic door control and connected infrastructure in a
              compact footprint suitable for commercial locations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Monitor, label: '15.6" Touch Screen' },
                { icon: Lightbulb, label: 'LED Operation Indicators' },
                { icon: Lock, label: 'Electronic Door Control' },
                { icon: CreditCard, label: 'Flexible Payments' },
                { icon: Server, label: 'IoT Infrastructure' },
                { icon: Cpu, label: 'Connected Smart Design' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-white px-4 py-3.5 shadow-soft">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-navy">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SPECIFICATIONS"
            heading="CXH01 Technical Specifications"
            subheading="Complete technical reference for the Nexera Smart CXH01."
          />
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-cloud-300/60 bg-white shadow-card">
            <dl className="grid sm:grid-cols-2">
              {SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col gap-1 px-5 py-4 sm:px-6 sm:py-5 ${
                    i % 2 === 0 ? 'sm:border-r border-cloud-300/60' : ''
                  } border-b border-cloud-300/60`}
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-brand">{spec.label}</dt>
                  <dd className="text-sm font-medium text-navy">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl bg-cloud-100 px-5 py-4">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 shrink-0 text-cyan-600 mt-0.5" />
              <p className="text-xs leading-relaxed text-navy/60">
                Designed to support helmet sanitation using high-temperature steam and UVC
                technology. Final machine configuration, payment options and connectivity may vary
                based on installation and commercial agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="bg-cloud-100 pb-16 lg:pb-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white px-6 py-10 text-center shadow-card sm:px-10">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl text-balance">
              Interested in the CXH01?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy/70">
              Whether you want to host a machine, rent space, or purchase your own, we'd like to
              hear from you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/partner-with-us" className="btn-primary">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={COMPANY.whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <Link to="/contact" className="btn-secondary">
                Request Machine Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
