import { Link } from 'react-router-dom';
import { Monitor, ArrowDownToLine, PlayCircle, Bike, ArrowRight, Sparkles, ThermometerSun, Droplets, CreditCard } from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const STEPS = [
  { num: '01', icon: Monitor, title: 'Choose Your Service', desc: 'Select the required option using the 15.6-inch touchscreen. The intuitive interface guides the rider through available service options.' },
  { num: '02', icon: ArrowDownToLine, title: 'Insert Helmet', desc: 'Place the helmet safely inside the designated cleaning compartment. The electronic door control secures the compartment during operation.' },
  { num: '03', icon: PlayCircle, title: 'Automatic Cleaning', desc: 'The machine performs the configured automated cleaning, disinfection and drying cycle — combining steam, UVC, atomized spray and heated airflow.' },
  { num: '04', icon: Bike, title: 'Remove & Ride', desc: 'Collect the refreshed helmet and continue your journey. Built-in fragrance dispensing helps leave the helmet feeling refreshed.' },
];

const PROCESS_FEATURES = [
  { icon: Droplets, title: 'Atomized Disinfectant', desc: 'Automated disinfectant mist is distributed through the cleaning compartment.' },
  { icon: ThermometerSun, title: 'Heated-Air Drying', desc: 'Circulating heated airflow supports efficient drying after cleaning.' },
  { icon: Sparkles, title: 'Fresh Fragrance', desc: 'Built-in scent dispensing provides a fresher finishing experience.' },
  { icon: CreditCard, title: 'Flexible Payment', desc: 'Supports QR code, cards, coins and banknotes depending on configuration.' },
];

export default function HowItWorks() {
  useSeo({
    title: 'How the Helmet Cleaning Machine Works | Nexera Smart',
    description:
      'See how the Nexera Smart CXH01 helmet cleaning machine works in 4 simple steps — from touchscreen service selection to automated cleaning, disinfection and drying.',
    path: '/how-it-works',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'How It Works', item: `${SITE_URL}/how-it-works` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">HOW IT WORKS</span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
            Simple Self-Service in 4 Steps
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            The CXH01 is designed for an intuitive rider experience with no staff involvement
            required. From service selection to a refreshed helmet, the process is fully automated.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="relative grid gap-8 lg:grid-cols-4">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand/10 via-brand/30 to-brand/10 lg:block" aria-hidden="true" />
            {STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-white shadow-card">
                    <step.icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {step.num}
                    </span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold text-navy">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process features */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="INSIDE THE CYCLE"
            heading="What Happens During the Cleaning Cycle"
            subheading="The automated process combines multiple technologies to refresh the helmet."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_FEATURES.map((f) => (
              <div key={f.title} className="card card-hover">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="bg-white pb-16 lg:pb-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-cloud-100 px-6 py-6 text-center">
            <p className="text-sm leading-relaxed text-navy/70">
              Cycle time depends on the selected service configuration. Contact Nexera Smart for the
              current machine program and operating details.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link to="/helmet-cleaning-machine" className="btn-primary">
              Explore the CXH01
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
