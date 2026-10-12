import { Link } from 'react-router-dom';
import {
  Package,
  Bike,
  ShieldCheck,
  Droplets,
  ThermometerSun,
  Monitor,
  ArrowRight,
  Check,
  MessageCircle,
  Warehouse,
  Store,
  ShoppingBag,
  Server,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const HUB_TYPES = [
  { icon: Package, label: 'Delivery Pickup Zones', desc: 'Areas where riders wait for and collect orders.' },
  { icon: Store, label: 'Dark Stores', desc: 'Quick-commerce fulfillment locations with high rider volume.' },
  { icon: ShoppingBag, label: 'Restaurant Clusters', desc: 'F&B areas with frequent delivery pickup activity.' },
  { icon: Warehouse, label: 'Distribution Hubs', desc: 'Logistics distribution centres with consistent delivery traffic.' },
];

const HUB_FEATURES = [
  { icon: ShieldCheck, title: 'Disinfection', desc: 'UVC and atomized disinfectant target the helmet interior as part of the automated cycle.' },
  { icon: Droplets, title: 'Deep Cleaning', desc: 'Steam-based cleaning and disinfectant mist work together for thorough coverage.' },
  { icon: ThermometerSun, title: 'Heated Drying', desc: 'Circulating heated airflow ensures helmets are dry and ready to wear.' },
  { icon: Monitor, title: 'Self-Service', desc: 'Riders complete the service themselves — no staff required at the hub.' },
];

const HUB_BENEFITS = [
  'Provide a practical amenity for delivery riders at your hub',
  'Self-service operation requires no staff involvement',
  'Compact 0.38 m² footprint fits easily in hub and warehouse environments',
  'Flexible payment options including QR code, coins and cards',
  'Connected via 4G, Wi-Fi and IoT for remote monitoring across multiple sites',
  'Suitable for sheltered or indoor placement within the hub facility',
];

export default function HelmetCleaningForDeliveryHubs() {
  useSeo({
    title: 'Helmet Cleaning Machine for Delivery Hubs Dubai | Nexera Smart',
    description:
      'A helmet cleaning machine for delivery hubs, dark stores and pickup zones in Dubai. The Nexera Smart CXH01 provides automated helmet cleaning for delivery riders at logistics facilities.',
    path: '/helmet-cleaning-machine-for-delivery-hubs',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Cleaning for Delivery Hubs', item: `${SITE_URL}/helmet-cleaning-machine-for-delivery-hubs` },
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
            FOR DELIVERY HUBS
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Cleaning Machine for Delivery Hubs
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Delivery hubs, dark stores and pickup zones in Dubai generate some of the highest
            motorcycle and rider footfall in the city. The Nexera Smart CXH01 provides a self-service
            helmet cleaning amenity designed for these environments.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-location" className="btn-primary">
              Submit Your Hub
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
            eyebrow="DELIVERY HUB TYPES"
            heading="Where the CXH01 Fits in the Delivery Ecosystem"
            subheading="The CXH01 is designed for locations where delivery riders naturally gather, wait or collect orders."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HUB_TYPES.map((h) => (
              <div key={h.label} className="card card-hover flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                  <h.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{h.label}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-navy/60">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="THE CXH01 AT HUBS"
            heading="Automated Helmet Care for High-Volume Rider Locations"
            subheading="A self-service machine that delivery riders can use during pickups, wait times and shift changes."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HUB_FEATURES.map((f) => (
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
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-cloud-100 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Benefits for Hub Operators</h2>
            <ul className="mt-6 space-y-3">
              {HUB_BENEFITS.map((item) => (
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
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                <Server className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-navy sm:text-2xl">Multi-Site Deployment</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              For operators managing multiple delivery hubs, dark stores or distribution centres, the
              CXH01's connected infrastructure supports deployment across several locations. Each
              machine's 4G, Wi-Fi and IoT connectivity enables remote monitoring and management
              across the network.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-cloud-100 px-4 py-3.5">
                <Bike className="h-5 w-5 text-brand" />
                <span className="text-sm font-medium text-navy">High rider volume locations</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-cloud-100 px-4 py-3.5">
                <Package className="h-5 w-5 text-brand" />
                <span className="text-sm font-medium text-navy">Compact footprint for hubs</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/submit-location" className="btn-primary">
                Submit Your Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Bring Helmet Cleaning to Your Delivery Hub"
        text="Offer a practical amenity for the delivery riders who pass through your hub every day, while creating a new commercial opportunity."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Hub"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
