import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Droplets,
  ThermometerSun,
  Sparkles,
  ArrowRight,
  Check,
  MessageCircle,
  Bike,
  Store,
  Fuel,
  GraduationCap,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const SANITIZATION_FEATURES = [
  { icon: ShieldCheck, title: 'UVC Sterilization', desc: 'UVC technology targets the interior surfaces of the helmet as part of the disinfection cycle.' },
  { icon: Droplets, title: 'Atomized Disinfectant', desc: 'A fine disinfectant mist is distributed through the cleaning compartment to cover the helmet interior.' },
  { icon: ThermometerSun, title: 'Heated Drying', desc: 'Circulating heated airflow helps ensure the helmet is dry and ready to wear after each cycle.' },
  { icon: Sparkles, title: 'Fragrance Refresh', desc: 'Built-in scent dispensing leaves the helmet smelling fresh after sanitization.' },
];

const SUITABLE_FOR = [
  { icon: Bike, label: 'Delivery Riders', desc: 'Riders who wear helmets for long shifts benefit from regular sanitization.' },
  { icon: GraduationCap, label: 'Driving Schools', desc: 'Training centres where multiple students share helmets between sessions.' },
  { icon: Store, label: 'Commercial Locations', desc: 'Retail and service locations where riders stop during their routes.' },
  { icon: Fuel, label: 'Service Stations', desc: 'Petrol and service stations frequented by motorcycle riders.' },
];

export default function HelmetSanitizerMachineDubai() {
  useSeo({
    title: 'Helmet Sanitizer Machine Dubai | Nexera Smart CXH01',
    description:
      'A helmet sanitizer machine in Dubai that combines UVC sterilization, atomized disinfectant, heated drying and fragrance dispensing. The Nexera Smart CXH01 for commercial locations.',
    path: '/helmet-sanitizer-machine-dubai',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Sanitizer Machine Dubai', item: `${SITE_URL}/helmet-sanitizer-machine-dubai` },
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
            HELMET SANITIZER MACHINE
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Sanitizer Machine in Dubai
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            The Nexera Smart CXH01 is a self-service helmet sanitizer machine that combines UVC
            sterilization, atomized disinfectant spray, heated-air drying and fragrance dispensing
            for commercial locations across Dubai.
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
              Helmet hygiene is a growing concern for motorcycle riders in Dubai, particularly for
              delivery riders who wear helmets for extended periods in high temperatures. A helmet
              sanitizer machine provides a practical way for riders to maintain cleanliness and
              comfort between rides, while commercial property owners can offer this as a value-added
              amenity.
            </p>
            <p>
              Unlike simple wipe-down solutions, the CXH01 helmet sanitizer machine uses a
              multi-stage automated process. UVC technology targets interior surfaces, atomized
              disinfectant mist is distributed through the cleaning compartment, and heated-air
              drying ensures the helmet is ready to wear. A built-in fragrance dispensing function
              leaves the helmet smelling fresh after each cycle.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SANITIZATION PROCESS"
            heading="How the CXH01 Sanitizes Helmets"
            subheading="A multi-stage automated process designed for effective helmet hygiene in a self-service format."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SANITIZATION_FEATURES.map((f) => (
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

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="WHO BENEFITS"
            heading="Who Needs a Helmet Sanitizer Machine"
            subheading="The CXH01 is designed for environments where helmet hygiene matters most."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUITABLE_FOR.map((s) => (
              <div key={s.label} className="card card-hover flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{s.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/60">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Self-Service Sanitization</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              The CXH01 operates as a fully self-service machine. Riders select their service on the
              15.6-inch touchscreen, place their helmet inside the cleaning compartment, and the
              machine handles the rest. No staff involvement is required, making it suitable for
              busy commercial locations.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'No staff required — fully automated self-service operation',
                'Electronic door control secures the compartment during the cycle',
                'Flexible payment options including QR code, coins and cards',
                'Connected via 4G, Wi-Fi and IoT for smart machine management',
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
              <Link to="/how-it-works" className="btn-secondary">
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Offer Helmet Sanitization at Your Location"
        text="Provide a valuable hygiene amenity for riders while creating a new commercial opportunity at your Dubai location."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Location"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
