import { Link } from 'react-router-dom';
import {
  Package,
  Bike,
  Building2,
  Warehouse,
  Boxes,
  Store,
  ShoppingBag,
  Fuel,
  GraduationCap,
  Wrench,
  Car,
  Server,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';
import CtaBanner from '@/components/CtaBanner';

const CATEGORIES = [
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

export default function Locations() {
  useSeo({
    title: 'Ideal Locations for Helmet Cleaning Machines in Dubai | Nexera Smart',
    description:
      'Discover the ideal locations for a Nexera Smart CXH01 helmet cleaning machine — delivery rider areas, petrol stations, driving schools, logistics hubs and more across Dubai.',
    path: '/locations',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${SITE_URL}/locations` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">IDEAL LOCATIONS</span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
            Where Nexera Works Best
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            The CXH01 is designed for locations with significant motorcycle and delivery-rider
            activity. We categorize suitable locations into four groups.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="space-y-10">
            {CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.accent}`}>
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-navy">{cat.name}</h2>
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.items.map((item) => (
                    <div key={item.label} className="card card-hover flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cloud-100 text-navy">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-navy">{item.label}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-navy/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dedicated Industry Solutions Links */}
          <div className="mt-16 border-t border-cloud-300/60 pt-12">
            <div className="text-center">
              <span className="eyebrow">TARGET APPLICATIONS</span>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">Specialized Solutions by Sector</h2>
              <p className="mt-3 text-sm text-navy/70 max-w-xl mx-auto">
                Explore dedicated information on how Nexera Smart CXH01 machines operate across key commercial environments in Dubai.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link to="/helmet-cleaning-machine-for-driving-schools" className="card card-hover flex flex-col justify-between group">
                <div>
                  <h3 className="font-semibold text-navy group-hover:text-brand transition-colors">Driving Schools</h3>
                  <p className="mt-1.5 text-xs text-navy/60">Automated hygiene for student helmets and motorcycle training academies.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">Learn more <ArrowRight className="h-3 w-3" /></span>
              </Link>
              <Link to="/helmet-cleaning-machine-for-petrol-stations" className="card card-hover flex flex-col justify-between group">
                <div>
                  <h3 className="font-semibold text-navy group-hover:text-brand transition-colors">Petrol Stations</h3>
                  <p className="mt-1.5 text-xs text-navy/60">Turn forecourt and convenience space into a recurring rider service amenity.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">Learn more <ArrowRight className="h-3 w-3" /></span>
              </Link>
              <Link to="/helmet-cleaning-machine-for-delivery-hubs" className="card card-hover flex flex-col justify-between group">
                <div>
                  <h3 className="font-semibold text-navy group-hover:text-brand transition-colors">Delivery & Dark Stores</h3>
                  <p className="mt-1.5 text-xs text-navy/60">High-capacity sanitation at rider pickup hubs and logistics depots.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">Learn more <ArrowRight className="h-3 w-3" /></span>
              </Link>
              <Link to="/delivery-rider-helmet-cleaning" className="card card-hover flex flex-col justify-between group">
                <div>
                  <h3 className="font-semibold text-navy group-hover:text-brand transition-colors">Delivery Riders</h3>
                  <p className="mt-1.5 text-xs text-navy/60">Fast, convenient UVC steam sanitization between delivery shifts.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">Learn more <ArrowRight className="h-3 w-3" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl rounded-2xl border border-cloud-300/60 bg-white px-6 py-8 text-center shadow-card sm:px-10">
            <MapPin className="mx-auto h-10 w-10 text-brand" />
            <h2 className="mt-4 text-xl font-bold text-navy sm:text-2xl">Know a Suitable Location?</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy/70 sm:text-base">
              If you operate or own a location with strong rider footfall, we would like to discuss
              placing a CXH01 machine with you.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/submit-location" className="btn-primary">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
