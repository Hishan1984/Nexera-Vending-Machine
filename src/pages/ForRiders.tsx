import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wind,
  Clock,
  Cpu,
  Bike,
  Monitor,
  ArrowDownToLine,
  PlayCircle,
  ThermometerSun,
  Droplets,
  ArrowRight,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import MachineImage from '@/components/MachineImage';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Cleaner',
    desc: 'Automated cleaning and disinfectant mist help reduce accumulated sweat, dust and grime that build up over long shifts on the road.',
  },
  {
    icon: Wind,
    title: 'Fresher',
    desc: 'Built-in scent dispensing and heated-air drying help leave the helmet feeling refreshed and more comfortable for the next ride.',
  },
  {
    icon: Clock,
    title: 'Convenient',
    desc: 'A self-service solution designed to fit into a rider\u2019s schedule between deliveries or rides — no need to clean your helmet at home.',
  },
  {
    icon: Cpu,
    title: 'Automated',
    desc: 'The full cycle runs automatically. No manual scrubbing, no hand-washing — just select, insert and let the machine do the work.',
  },
  {
    icon: Bike,
    title: 'Designed for Everyday Riders',
    desc: 'Built for delivery riders and motorcycle users who spend long hours in their helmets across Dubai\u2019s roads and high-traffic pickup areas.',
  },
];

const STEPS = [
  { num: '01', icon: Monitor, title: 'Select', desc: 'Choose your service on the 15.6-inch touchscreen.' },
  { num: '02', icon: ArrowDownToLine, title: 'Insert', desc: 'Place your helmet inside the cleaning compartment.' },
  { num: '03', icon: PlayCircle, title: 'Clean', desc: 'The machine runs the automated cleaning and disinfection cycle.' },
  { num: '04', icon: ThermometerSun, title: 'Dry & Refresh', desc: 'Heated airflow dries the helmet while fragrance dispensing adds a fresh finish.' },
  { num: '05', icon: Bike, title: 'Ride', desc: 'Collect your refreshed helmet and get back on the road.' },
];

export default function ForRiders() {
  useSeo({
    title: 'Helmet Cleaning for Delivery Riders in Dubai | Nexera Smart',
    description:
      'Your helmet works hard too. Nexera Smart gives motorcycle and delivery riders in Dubai a fast, automated self-service way to clean, dry and refresh helmets between rides.',
    path: '/for-riders',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'For Riders', item: `${SITE_URL}/for-riders` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cloud-100">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="container-7xl relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <span className="eyebrow">FOR RIDERS</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl text-balance">
              Your Helmet Works Hard Too.
            </h1>
            <p className="mt-4 text-lg font-medium text-navy/60 sm:text-xl">
              Sweat. Dust. Heat. Long shifts. Repeat.
            </p>
            <p className="mt-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              Delivery riders and motorcycle users can spend many hours wearing their helmets.
              Nexera Smart provides a convenient self-service solution to help riders keep their
              helmets cleaner, fresher and more comfortable between rides.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/locations" className="btn-primary">
                Find a Location
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
              <Link to="/how-it-works" className="btn-secondary">
                How It Works
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div
              className="absolute inset-0 -z-10 rounded-full opacity-50 blur-3xl"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,191,216,0.18), transparent 70%)' }}
              aria-hidden="true"
            />
            <MachineImage priority loading="eager" className="relative w-full max-w-[420px] drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Five Benefit Areas */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="RIDER BENEFITS"
            heading="Cleaner. Fresher. Convenient. Automated. Built for You."
            subheading="Five ways the CXH01 helps riders manage helmet hygiene on the go."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className={`card card-hover ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The CXH01 Process */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="THE PROCESS"
            heading="From Select to Ride in 5 Steps"
            subheading="A simple, automated self-service process designed for busy riders."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="card card-hover h-full text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="mt-4 block text-xs font-bold tracking-wider text-brand">
                    STEP {step.num}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-5 w-5 text-brand/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/helmet-cleaning-machine" className="btn-primary">
              Explore the CXH01
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sanitation Note */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-cloud-100 px-6 py-6 sm:px-8">
            <div className="flex items-start gap-3">
              <Droplets className="h-5 w-5 shrink-0 text-cyan-600 mt-0.5" />
              <p className="text-sm leading-relaxed text-navy/70">
                The CXH01 is designed to support helmet sanitation using high-temperature steam and
                UVC technology. Nexera Smart does not make specific claims about the elimination of
                bacteria, viruses or other microorganisms unless supported by certified
                documentation. Cycle time depends on the selected service configuration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations teaser */}
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white px-6 py-10 text-center shadow-card sm:px-10">
            <MapPin className="mx-auto h-10 w-10 text-brand" />
            <h2 className="mt-4 text-xl font-bold text-navy sm:text-2xl">
              Where Can Riders Find a CXH01?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
              Nexera Smart is placing CXH01 machines at suitable high-traffic rider locations across
              Dubai. If you know a location that could benefit, let us know.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/locations" className="btn-primary">
                View Ideal Locations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Propose a Location
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Know a Location That Needs One?"
        text="If you frequent a location that would benefit from a helmet cleaning machine, let us know — or share Nexera Smart with the location owner."
      />
    </>
  );
}
