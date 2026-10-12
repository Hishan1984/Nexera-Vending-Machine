import { Link } from 'react-router-dom';
import {
  Fuel,
  Bike,
  ShieldCheck,
  Droplets,
  ThermometerSun,
  Monitor,
  CreditCard,
  ArrowRight,
  Check,
  MessageCircle,
  Clock,
  MapPin,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const STATION_ADVANTAGES = [
  { icon: ShieldCheck, title: 'Disinfection', desc: 'UVC and atomized disinfectant target the helmet interior as part of the automated cycle.' },
  { icon: Droplets, title: 'Deep Cleaning', desc: 'Steam-based cleaning and disinfectant mist work together for a thorough clean.' },
  { icon: ThermometerSun, title: 'Heated Drying', desc: 'Circulating heated airflow ensures the helmet is dry and comfortable after cleaning.' },
  { icon: Monitor, title: 'Self-Service', desc: 'Riders complete the service themselves via the 15.6-inch touchscreen — no staff needed.' },
];

const STATION_BENEFITS = [
  'Attract motorcycle and delivery-rider traffic to your station',
  'Add a self-service amenity that requires no staff involvement',
  'Create additional commercial activity through flexible payment options',
  'Compact 0.38 m² footprint fits alongside existing station facilities',
  'Connected via 4G, Wi-Fi and IoT for remote monitoring',
  'Suitable for sheltered or indoor placement areas within the station',
];

const RIDER_BEHAVIOR = [
  { icon: Clock, title: 'Regular Stops', desc: 'Motorcycle riders frequently stop at petrol stations for refueling, rest and supplies during shifts.' },
  { icon: Bike, title: 'High Rider Volume', desc: 'Service stations on major Dubai routes see consistent motorcycle and delivery-rider traffic throughout the day.' },
  { icon: MapPin, title: 'Strategic Locations', desc: 'Petrol stations are positioned along key routes, making them natural access points for rider services.' },
];

export default function HelmetCleaningForPetrolStations() {
  useSeo({
    title: 'Helmet Cleaning Machine for Petrol Stations Dubai | Nexera Smart',
    description:
      'A helmet cleaning machine for petrol stations and service stations in Dubai. The Nexera Smart CXH01 provides automated helmet cleaning and disinfection for motorcycle riders at service stations.',
    path: '/helmet-cleaning-machine-for-petrol-stations',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Helmet Cleaning for Petrol Stations', item: `${SITE_URL}/helmet-cleaning-machine-for-petrol-stations` },
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
            FOR PETROL STATIONS
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Helmet Cleaning Machine for Petrol Stations
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Petrol and service stations in Dubai see consistent motorcycle and delivery-rider
            traffic. The Nexera Smart CXH01 adds a self-service helmet cleaning amenity that riders
            can use during their stops.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/submit-location" className="btn-primary">
              Submit Your Station
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
            eyebrow="WHY PETROL STATIONS"
            heading="Service Stations Are Natural Rider Access Points"
            subheading="Petrol stations are among the most frequented stops for motorcycle riders and delivery drivers across Dubai."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {RIDER_BEHAVIOR.map((r) => (
              <div key={r.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="THE CXH01 ADVANTAGE"
            heading="A Self-Service Amenity for Riders"
            subheading="The CXH01 provides automated helmet care that requires no staff involvement at the station."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATION_ADVANTAGES.map((a) => (
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
            <h2 className="text-xl font-bold text-navy sm:text-2xl">Benefits for Petrol Station Operators</h2>
            <ul className="mt-6 space-y-3">
              {STATION_BENEFITS.map((item) => (
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
                <Fuel className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-navy sm:text-2xl">Installation at Service Stations</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">
              The CXH01 requires a sheltered or indoor placement area with a standard power outlet
              and approximately 0.38 m² of floor space. Final installation requirements are subject
              to site assessment and agreement.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-cloud-100 px-4 py-3.5">
                <CreditCard className="h-5 w-5 text-brand" />
                <span className="text-sm font-medium text-navy">Flexible payment options</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-cloud-300/60 bg-cloud-100 px-4 py-3.5">
                <Bike className="h-5 w-5 text-brand" />
                <span className="text-sm font-medium text-navy">Designed for rider traffic</span>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/submit-location" className="btn-primary">
                Submit Your Station
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Add Helmet Cleaning to Your Petrol Station"
        text="Attract more motorcycle riders to your station with a self-service helmet cleaning amenity that requires no staff involvement."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Station"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
