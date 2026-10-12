import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Monitor,
  Droplets,
  ThermometerSun,
  Sparkles,
  ArrowRight,
  Check,
  MessageCircle,
  Bike,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const SCHOOL_CHALLENGES = [
  { icon: Users, title: 'Shared Helmets', desc: 'Multiple students often share the same helmets between training sessions, creating hygiene concerns.' },
  { icon: ShieldCheck, title: 'Hygiene Expectations', desc: 'Students increasingly expect clean, sanitized helmets — particularly in Dubai\'s climate.' },
  { icon: Bike, title: 'Manual Cleaning Limits', desc: 'Wiping helmets by hand between sessions is time-consuming, inconsistent and labour-intensive.' },
];

const CXH01_ADVANTAGES = [
  { icon: ShieldCheck, title: 'Automated Disinfection', desc: 'UVC and atomized disinfectant target the helmet interior as part of each automated cycle.' },
  { icon: Droplets, title: 'Atomized Cleaning', desc: 'Disinfectant mist is distributed through the cleaning compartment for thorough coverage.' },
  { icon: ThermometerSun, title: 'Heated Drying', desc: 'Circulating heated airflow ensures helmets are dry and ready for the next student.' },
  { icon: Sparkles, title: 'Fresh Fragrance', desc: 'Built-in scent dispensing leaves shared helmets smelling clean after every cycle.' },
];

const SCHOOL_BENEFITS = [
  'Improve the training experience with sanitized helmets for every student',
  'Reduce manual cleaning effort — the machine handles it automatically',
  'Self-service operation via 15.6-inch touchscreen, no staff required',
  'Compact 0.38 m² footprint fits easily in training facilities',
  'Flexible payment options for student-per-use or school-subsidized models',
  'Connected via 4G, Wi-Fi and IoT for smart machine management',
];

export default function HelmetCleaningForDrivingSchools() {
  useSeo({
    title: 'Helmet Cleaning Machine for Driving Schools Dubai | Nexera Smart',
    description:
      'A helmet cleaning machine for driving schools in Dubai. The Nexera Smart CXH01 automates helmet disinfection and drying for shared training helmets, improving hygiene for students.',
    path: '/helmet-cleaning-machine-for-driving-schools',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Cleaning for Driving Schools', item: `${SITE_URL}/helmet-cleaning-machine-for-driving-schools` },
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
            FOR DRIVING SCHOOLS
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Cleaning Machine for Driving Schools
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Driving schools and motorcycle training centres in Dubai rely on shared helmets for
            multiple students each day. The Nexera Smart CXH01 automates helmet cleaning and
            disinfection between sessions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-location" className="btn-primary">
              Submit Your School
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
          <SectionHeading
            eyebrow="THE CHALLENGE"
            heading="Shared Helmets Create Hygiene Concerns"
            subheading="Driving schools and motorcycle training centres face a specific problem: multiple students using the same helmets throughout the day."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {SCHOOL_CHALLENGES.map((c) => (
              <div key={c.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="THE SOLUTION"
            heading="Automated Helmet Care Between Sessions"
            subheading="The CXH01 provides a self-service solution that sanitizes shared helmets between training sessions."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CXH01_ADVANTAGES.map((a) => (
              <div key={a.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-cloud-100 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Benefits for Driving Schools</h2>
            <ul className="mt-6 space-y-3">
              {SCHOOL_BENEFITS.map((item) => (
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

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            heading="Simple for Students, Simple for Schools"
            subheading="The CXH01 is designed for self-service operation with no staff involvement required."
          />
          <div className="mt-12 mx-auto max-w-3xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Monitor className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">1. Select Service</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  The student selects the cleaning service on the 15.6-inch touchscreen.
                </p>
              </div>
              <div className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">2. Insert Helmet</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  The helmet is placed inside the cleaning compartment and the door closes securely.
                </p>
              </div>
              <div className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">3. Automated Cycle</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  The machine runs the automated cleaning, disinfection and drying cycle.
                </p>
              </div>
              <div className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">4. Ready for Next Student</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">
                  The sanitized, dried and refreshed helmet is collected and ready for the next use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Upgrade Helmet Hygiene at Your Driving School"
        text="Offer sanitized helmets for every student with an automated, self-service cleaning machine at your training facility."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your School"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
