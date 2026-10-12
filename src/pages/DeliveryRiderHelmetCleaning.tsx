import { Link } from 'react-router-dom';
import {
  Bike,
  Package,
  Store,
  ShoppingBag,
  ShieldCheck,
  Droplets,
  ThermometerSun,
  Monitor,
  ArrowRight,
  Check,
  MessageCircle,
  Clock,
  Users,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const RIDER_PROBLEMS = [
  { icon: Clock, title: 'Long Shifts', desc: 'Delivery riders often wear helmets for 8–12 hour shifts in Dubai heat, leading to sweat buildup and odor.' },
  { icon: Users, title: 'Shared Helmets', desc: 'Some riders share or rotate helmets, making hygiene a genuine health concern between uses.' },
  { icon: Bike, title: 'No Cleaning Access', desc: 'Riders rarely have access to proper helmet cleaning facilities during their working hours.' },
];

const SOLUTION_POINTS = [
  { icon: ShieldCheck, title: 'Disinfection', desc: 'UVC and atomized disinfectant target the helmet interior as part of the automated cycle.' },
  { icon: Droplets, title: 'Deep Cleaning', desc: 'Steam-based cleaning and disinfectant mist work together for a thorough clean.' },
  { icon: ThermometerSun, title: 'Heated Drying', desc: 'Circulating heated airflow ensures the helmet is dry and ready to wear.' },
  { icon: Monitor, title: 'Self-Service', desc: 'Riders select and complete the service themselves via the 15.6-inch touchscreen.' },
];

const DEPLOYMENT_ZONES = [
  { icon: Package, label: 'Delivery Pickup Zones', desc: 'Areas where riders wait for order pickups.' },
  { icon: Store, label: 'Dark Stores', desc: 'Quick-commerce fulfillment locations.' },
  { icon: ShoppingBag, label: 'Restaurant Clusters', desc: 'F&B areas with frequent delivery activity.' },
  { icon: Store, label: 'Convenience Stores', desc: 'Retail stops along delivery routes.' },
];

export default function DeliveryRiderHelmetCleaning() {
  useSeo({
    title: 'Delivery Rider Helmet Cleaning Dubai | Nexera Smart CXH01',
    description:
      'A helmet cleaning solution for delivery riders in Dubai. The Nexera Smart CXH01 provides automated cleaning, disinfection and drying for delivery rider helmets at commercial locations.',
    path: '/delivery-rider-helmet-cleaning',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Delivery Rider Helmet Cleaning', item: `${SITE_URL}/delivery-rider-helmet-cleaning` },
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
            DELIVERY RIDER HELMET CLEANING
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Cleaning for Delivery Riders in Dubai
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Dubai's delivery riders cover long distances in high temperatures every day. The Nexera
            Smart CXH01 provides automated helmet cleaning, disinfection and drying at commercial
            locations along their routes.
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
          <SectionHeading
            eyebrow="THE RIDER CHALLENGE"
            heading="Why Delivery Riders Need Helmet Cleaning"
            subheading="Dubai's delivery ecosystem depends on riders who work long hours in demanding conditions."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {RIDER_PROBLEMS.map((p) => (
              <div key={p.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="THE CXH01 SOLUTION"
            heading="Automated Helmet Care for Riders"
            subheading="A self-service machine that delivery riders can use during stops along their routes."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTION_POINTS.map((s) => (
              <div key={s.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="DEPLOYMENT ZONES"
            heading="Where to Deploy for Maximum Rider Access"
            subheading="The CXH01 works best at locations where delivery riders naturally stop during their shifts."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DEPLOYMENT_ZONES.map((z) => (
              <div key={z.label} className="card card-hover flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                  <z.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{z.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/60">{z.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white p-8 sm:p-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">A Rider Benefit and a Business Opportunity</h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              For riders, the CXH01 provides access to helmet cleaning and disinfection that would
              otherwise be unavailable during working hours. For location owners, it creates a
              self-service amenity that attracts rider footfall and generates commercial activity
              through flexible payment options.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Self-service operation — no staff required at the host location',
                'Flexible payments including QR code, coins and cards',
                'Compact footprint suitable for small commercial spaces',
                'Connected via 4G, Wi-Fi and IoT for remote monitoring',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-navy/80">
                  <Check className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/for-riders" className="btn-primary">
                For Riders
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
        heading="Serve Dubai's Delivery Riders at Your Location"
        text="Offer a practical amenity that delivery riders genuinely need, while creating a new commercial opportunity at your location."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Location"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
