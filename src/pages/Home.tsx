import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Wind,
  Sparkles,
  ThermometerSun,
  Wifi,
  Droplets,
  Flame,
  CreditCard,
  Lock,
  Monitor,
  Lightbulb,
  Server,
  ArrowRight,
  MapPin,
  Wrench,
  Building2,
  Fuel,
  GraduationCap,
  Bike,
  Warehouse,
  Car,
  Store,
  ShoppingBag,
  Boxes,
  ArrowDownToLine,
  PlayCircle,
  MessageCircle,
  Phone,
  TrendingUp,
  Ruler,
  Handshake,
  Cpu,
  Users,
  Check,
} from 'lucide-react';
import { useSeo, useJsonLd, organizationJsonLd } from '@/lib/seo';
import { ASSETS, COMPANY } from '@/lib/constants';
import MachineImage from '@/components/MachineImage';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const QUICK_VALUES = [
  { icon: Wind, title: 'Automated Cleaning' },
  { icon: Flame, title: 'Steam + UVC Disinfection' },
  { icon: ThermometerSun, title: 'Heated-Air Drying' },
  { icon: Wifi, title: '4G / Wi-Fi / IoT Connected' },
];

const COMMERCIAL_VALUES = [
  { icon: Users, title: 'Useful Rider Amenity', desc: 'A practical self-service facility for motorcycle and delivery riders visiting your location.' },
  { icon: Cpu, title: 'Automated Self-Service', desc: 'Designed around self-service operation without requiring dedicated host-location staff.' },
  { icon: TrendingUp, title: 'Potential Revenue Stream', desc: 'An additional commercial opportunity from suitable underutilized space.' },
  { icon: Ruler, title: 'Compact Footprint', desc: 'Machine dimensions of approximately 620 × 620 × 1780 mm fit many commercial environments.' },
  { icon: Handshake, title: 'Flexible Partnership Options', desc: 'Revenue sharing, space rental and machine supply arrangements.' },
  { icon: Wifi, title: 'Smart Connected Technology', desc: 'Touchscreen operation, digital payment capability and connected infrastructure.' },
];

const LOCATION_OWNER_CARDS = [
  {
    icon: TrendingUp,
    tag: 'Revenue Sharing',
    heading: 'Revenue Sharing',
    desc: 'Nexera Smart installs the machine at an approved location and both parties participate in the generated service revenue according to the agreed commercial arrangement.',
    cta: 'Discuss Revenue Sharing',
    href: '/contact',
  },
  {
    icon: Building2,
    tag: 'Space Rental',
    heading: 'Space Rental',
    desc: 'Property owners and operators can offer suitable space for installation under an agreed rental arrangement.',
    cta: 'Offer a Location',
    href: '/contact',
  },
  {
    icon: Wrench,
    tag: 'Machine Supply',
    heading: 'Machine Supply',
    desc: 'Businesses can enquire about purchasing or operating their own CXH01 solution.',
    cta: 'Request Machine Information',
    href: '/contact',
  },
];

const POTENTIAL_LOCATIONS = [
  'Delivery rider rest areas',
  'Convenience stores',
  'Petrol/service stations',
  'Driving schools',
  'Logistics facilities',
  'Commercial parking areas',
  'Delivery pickup areas',
  'Restaurant clusters',
  'Warehouses and distribution hubs',
];

const WHY_PARTNER = [
  { icon: Ruler, title: 'Small Space Requirement', desc: 'Compact machine footprint suitable for many commercial environments.' },
  { icon: TrendingUp, title: 'Additional Revenue Potential', desc: 'Revenue-sharing opportunities may be available for suitable locations.' },
  { icon: Users, title: 'Useful Rider Amenity', desc: 'Provide an additional service for motorcycle users visiting the location.' },
  { icon: Cpu, title: 'Automated Operation', desc: 'Designed around self-service operation.' },
  { icon: Handshake, title: 'Flexible Partnership', desc: 'Revenue share, space rental and machine supply options.' },
  { icon: Monitor, title: 'Smart Technology', desc: 'Touchscreen operation, digital payment capability and connected infrastructure.' },
];

const FEATURES = [
  {
    icon: Flame,
    title: 'Steam + UVC Disinfection',
    desc: 'Combines high-temperature steam and UVC technology as part of the helmet sanitation process.',
  },
  {
    icon: Droplets,
    title: 'Atomized Cleaning',
    desc: 'Automated disinfectant mist is distributed through the cleaning compartment.',
  },
  {
    icon: ThermometerSun,
    title: 'Heated-Air Drying',
    desc: 'Circulating heated airflow supports efficient drying after cleaning.',
  },
  {
    icon: Sparkles,
    title: 'Fresh Fragrance',
    desc: 'Built-in scent dispensing helps leave the helmet feeling refreshed.',
  },
  {
    icon: Wifi,
    title: 'Smart Connectivity',
    desc: 'Integrated 4G, Wi-Fi and IoT connectivity supports smart machine operations.',
  },
];

const STEPS = [
  {
    num: '01',
    icon: Monitor,
    title: 'Choose Your Service',
    desc: 'Select the required option using the 15.6-inch touchscreen.',
  },
  {
    num: '02',
    icon: ArrowDownToLine,
    title: 'Insert Helmet',
    desc: 'Place the helmet safely inside the designated cleaning compartment.',
  },
  {
    num: '03',
    icon: PlayCircle,
    title: 'Automatic Cleaning',
    desc: 'The machine performs the configured automated cleaning, disinfection and drying cycle.',
  },
  {
    num: '04',
    icon: Bike,
    title: 'Remove & Ride',
    desc: 'Collect the refreshed helmet and continue your journey.',
  },
];

const RIDER_BENEFITS = [
  { icon: Wind, title: 'FAST & CONVENIENT', desc: 'Self-service cleaning designed for busy riders.' },
  { icon: Sparkles, title: 'FRESHER HELMET', desc: 'Helps reduce accumulated sweat, dust and unpleasant odors.' },
  { icon: Server, title: 'AUTOMATED PROCESS', desc: 'No manual helmet cleaning process required from the location operator.' },
  { icon: ThermometerSun, title: 'HEATED DRYING', desc: 'Circulating heat airflow supports quicker drying.' },
  { icon: Droplets, title: 'REFRESHING FRAGRANCE', desc: 'Built-in scent dispensing provides a fresher finishing experience.' },
  { icon: CreditCard, title: 'MULTIPLE PAYMENT OPTIONS', desc: 'Supports QR code, cards, coins and banknotes depending on machine configuration.' },
  { icon: MapPin, title: 'ACCESSIBLE LOCATIONS', desc: 'Designed for placement near rider activity and high motorcycle traffic.' },
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

const PROPERTY_CARDS = [
  { icon: Sparkles, title: 'NEW AMENITY', desc: 'Introduce a useful service designed for motorcycle and delivery riders.' },
  { icon: CreditCard, title: 'REVENUE OPPORTUNITY', desc: 'Create an additional commercial opportunity from underutilized space.' },
  { icon: Boxes, title: 'COMPACT FOOTPRINT', desc: 'Machine dimensions are approximately 620 × 620 × 1780 mm.' },
  { icon: Server, title: 'AUTOMATED TECHNOLOGY', desc: 'The self-service model can operate without requiring dedicated host-location staff.' },
];

const TECH_FEATURES = [
  { icon: Wifi, title: '4G Connectivity', desc: 'Integrated 4G module supports machine connectivity.' },
  { icon: Wifi, title: 'Wi-Fi Connectivity', desc: 'Wi-Fi capability supports network connection at suitable locations.' },
  { icon: Server, title: 'IoT Integration', desc: 'IoT infrastructure supports smart machine operations.' },
  { icon: Lock, title: 'Electronic Door Control', desc: 'Electronically controlled door for self-service operation.' },
  { icon: Monitor, title: 'Touchscreen Interface', desc: '15.6-inch full-color touch screen for service selection.' },
  { icon: Lightbulb, title: 'LED Operation Indicators', desc: 'LED lighting communicates machine operation status.' },
  { icon: CreditCard, title: 'Flexible Payment Integration', desc: 'Supports QR code, cards, coins and banknotes where configured.' },
  { icon: Server, title: 'Remote-ready Smart Infrastructure', desc: 'Connected infrastructure designed to support smart operations.' },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useSeo({
    title: 'Nexera Smart | Helmet Cleaning Machine & Smart Vending Solutions Dubai',
    description:
      'Nexera Smart installs automated CXH01 helmet cleaning machines at high-traffic rider locations across Dubai through revenue sharing, space rental and machine supply partnerships.',
    path: '/',
  });

  useJsonLd('ld-org', organizationJsonLd);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay may be restricted or aborted by browser policy
              });
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 hero-glow" aria-hidden="true" />
        <div className="container-7xl relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-12 lg:py-24">
          <div className="max-w-xl">
            <span className="eyebrow">SMART AUTOMATED SOLUTIONS FOR DUBAI</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl text-balance">
              Smart Helmet Cleaning.
              <br />
              <span className="gradient-text">A New Revenue Opportunity for Your Location.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              Nexera Smart installs automated CXH01 helmet cleaning machines at high-traffic rider
              locations across Dubai through revenue sharing, space rental and machine supply
              partnerships.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/helmet-cleaning-machine" className="btn-primary">
                Explore the CXH01
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/partner-with-us" className="btn-secondary">
                Partner With Us
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
            </div>
            <p className="mt-5 text-sm font-medium text-navy/50">Automated • Connected • Convenient</p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="pointer-events-none absolute inset-0 -z-10 hero-glow" aria-hidden="true" />
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 rounded-full opacity-60 blur-3xl"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(0,191,216,0.18), transparent 70%)' }}
                aria-hidden="true"
              />
              <MachineImage
                priority
                loading="eager"
                className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VALUE STRIP */}
      <section className="border-y border-cloud-300/60 bg-cloud-100">
        <div className="container-7xl py-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {QUICK_VALUES.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-navy sm:text-base">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMERCIAL VALUE MESSAGE */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="COMMERCIAL VALUE"
            heading="More Than a Machine — A Smart Location Asset"
            subheading="The CXH01 combines rider convenience with commercial flexibility for suitable high-footfall locations."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_VALUES.map((item) => (
              <div key={item.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY CREDIBILITY */}
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl">
          <div className="mx-auto max-w-4xl rounded-2xl border border-cloud-300/60 bg-white px-6 py-10 shadow-card sm:px-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="eyebrow">WHO WE ARE</span>
                <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl text-balance">
                  Dubai-Based Smart Vending Solutions
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-navy/70 sm:text-base">
                  Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is a Dubai-based vending
                  machine and automated self-service solutions company focused on practical
                  technology for high-footfall commercial locations.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-semibold text-navy">{COMPANY.city}, {COMPANY.country}</p>
                    <p className="text-sm text-navy/60">C-03, Al Shindagha, Deira</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-sm font-semibold text-navy">{COMPANY.phone}</p>
                    <p className="text-sm text-navy/60">Phone / WhatsApp</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                  <Link to="/about" className="btn-secondary !py-2.5 text-sm">
                    Learn About Nexera Smart
                  </Link>
                  <a
                    href={COMPANY.whatsappGeneralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp !py-2.5 text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO VIDEO */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="INTRODUCTION"
            heading="Meet Nexera Smart"
            subheading="Smart self-service technology designed to make everyday rider convenience easier."
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-white shadow-card border border-cloud-300/60 p-2 sm:p-3">
              <div className="relative overflow-hidden rounded-xl bg-navy">
                <video
                  ref={videoRef}
                  src={ASSETS.video}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  poster={ASSETS.machine}
                  className="aspect-video w-full bg-navy object-cover"
                />
              </div>
            </div>
            <p className="mt-6 text-center text-base leading-relaxed text-navy/70">
              Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is a Dubai-based smart
              vending and automated solutions company focused on practical self-service technologies
              for high-footfall commercial locations.
            </p>
            <div className="mt-6 text-center">
              <Link to="/about" className="btn-primary">
                Learn About Nexera Smart
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOR LOCATION OWNERS */}
      <section id="for-location-owners" className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="FOR LOCATION OWNERS"
            heading="Have Rider Footfall? Turn It Into an Opportunity."
            subheading="Nexera Smart is looking for suitable commercial locations across Dubai with regular motorcycle and delivery-rider activity."
          />
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="flex flex-wrap justify-center gap-2.5">
              {POTENTIAL_LOCATIONS.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cloud-300 bg-cloud-100 px-3.5 py-1.5 text-xs font-medium text-navy/70"
                >
                  <Check className="h-3.5 w-3.5 text-brand" />
                  {loc}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {LOCATION_OWNER_CARDS.map((card) => (
              <div key={card.heading} className="card card-hover flex flex-col">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
                  <card.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-cyan-600">{card.tag}</div>
                <h3 className="mt-1 text-lg font-bold text-navy">{card.heading}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/70">{card.desc}</p>
                <div className="mt-5">
                  <Link to={card.href} className="btn-secondary w-full !py-2.5 text-sm">
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH NEXERA */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="WHY PARTNER WITH NEXERA"
            heading="Why Partner With Nexera?"
            subheading="Six reasons commercial property owners and operators choose to work with Nexera Smart."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_PARTNER.map((item) => (
              <div key={item.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CXH01 PRODUCT SHOWCASE */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="PRODUCT SHOWCASE"
            heading="NEXERA CXH01 Helmet Cleaning Machine"
            subheading="Automated helmet cleaning, disinfection, drying and refreshing in one connected self-service machine."
          />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative flex justify-center">
              <div
                className="absolute inset-0 -z-10 rounded-full opacity-50 blur-3xl"
                style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(8,118,217,0.15), transparent 70%)' }}
                aria-hidden="true"
              />
              <MachineImage className="relative w-full max-w-[440px] drop-shadow-xl" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
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
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-pad bg-cloud-200">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            heading="Simple Self-Service in 4 Steps"
            subheading="Designed for an intuitive rider experience with no staff involvement required."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
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
                {i < STEPS.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight className="h-5 w-5 text-brand/40" />
                  </div>
                )}
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

      {/* BENEFITS FOR RIDERS */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="FOR RIDERS"
            heading="Built for Riders Who Are Always on the Move"
            subheading="Delivery riders and motorcycle users can spend many hours wearing their helmets. Nexera Smart provides a convenient self-service solution to help riders keep their helmets cleaner, fresher and more comfortable between rides."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RIDER_BENEFITS.map((b) => (
              <div key={b.title} className="card card-hover">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-navy">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/for-riders" className="btn-primary">
              Find Out More for Riders
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SPECIFICATIONS"
            heading="CXH01 Technical Specifications"
            subheading="Full technical details for the Nexera Smart CXH01 Helmet Cleaning Machine."
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
        </div>
      </section>

      {/* IDEAL LOCATIONS */}
      <section className="section-pad bg-cloud-200">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="IDEAL LOCATIONS"
            heading="Where Nexera Works Best"
            subheading="Designed for locations with high delivery-rider activity, including riders operating across major delivery platforms."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: Bike, label: 'Delivery Rider Rest Areas' },
              { icon: Boxes, label: 'Delivery Pickup & Waiting Areas' },
              { icon: Store, label: 'Convenience Stores' },
              { icon: Fuel, label: 'Petrol & Service Stations' },
              { icon: GraduationCap, label: 'Driving Schools' },
              { icon: Bike, label: 'Motorcycle Training Centres' },
              { icon: Warehouse, label: 'Logistics & Warehouses' },
              { icon: Car, label: 'Commercial Parking Areas' },
              { icon: ShoppingBag, label: 'Restaurant Clusters' },
              { icon: Boxes, label: 'Dark Stores & Quick Commerce Hubs' },
              { icon: Wrench, label: 'Motorcycle Service Centres' },
              { icon: Building2, label: 'Shopping & Commercial Areas' },
            ].map((loc) => (
              <div
                key={loc.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-cloud-300/60 bg-white p-5 text-center shadow-soft transition-all hover:border-brand/30 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <loc.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-navy">{loc.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/locations" className="btn-secondary">
              View All Ideal Locations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY PROPERTY OWNERS SHOULD PARTNER */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="FOR PROPERTY OWNERS"
            heading="A Small Footprint. A Smarter Commercial Opportunity."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_CARDS.map((card) => (
              <div key={card.title} className="card card-hover text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-sm font-bold tracking-wide text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{card.desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl rounded-xl bg-cloud-100 px-5 py-4 text-center text-xs leading-relaxed text-navy/60">
            Final installation requirements, operating clearances, utilities and commercial
            arrangements are subject to site assessment and agreement.
          </p>
        </div>
      </section>

      {/* SMART TECHNOLOGY */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SMART TECHNOLOGY"
            heading="Connected Technology Behind Every Machine"
            subheading="The CXH01 integrates connectivity and self-service convenience for modern commercial locations."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_FEATURES.map((tf) => (
              <div key={tf.title} className="card card-hover">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                  <tf.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-navy">{tf.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{tf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">ABOUT NEXERA SMART</span>
            <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl lg:text-4xl text-balance">
              About Nexera Smart
            </h2>
            <p className="mt-5 text-base leading-relaxed text-navy/70 sm:text-lg">
              Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is a Dubai-based company
              focused on smart vending machines and automated self-service technologies. Our mission
              is to introduce practical smart solutions that improve everyday convenience while
              helping commercial partners use their spaces more effectively.
            </p>
            <p className="mt-5 text-lg font-semibold gradient-text">{COMPANY.tagline}</p>
            <div className="mt-8">
              <Link to="/about" className="btn-primary">
                Learn About Nexera Smart
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
