import { Link } from 'react-router-dom';
import {
  Target,
  Zap,
  Cpu,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  Network,
  Wrench,
  MessageCircle,
} from 'lucide-react';
import { useSeo, useJsonLd, organizationJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL, DOWNLOADS } from '@/lib/constants';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const APPROACH_CARDS = [
  {
    icon: Target,
    title: 'Practical Solutions',
    desc: 'We focus on self-service technologies that solve real everyday problems for riders and create value for commercial partners.',
  },
  {
    icon: Zap,
    title: 'Smart Convenience',
    desc: 'Our machines combine automation, connectivity and self-service convenience to deliver a modern amenity experience.',
  },
  {
    icon: Cpu,
    title: 'Connected Technology',
    desc: 'Integrated 4G, Wi-Fi and IoT infrastructure supports smart machine operations for modern commercial environments.',
  },
];

const POSITIONING_POINTS = [
  {
    icon: MapPin,
    title: 'Dubai-Based Operations',
    desc: 'Headquartered in Deira, Dubai, serving commercial locations across the United Arab Emirates.',
  },
  {
    icon: ShieldCheck,
    title: 'Registered Business',
    desc: 'Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C — a Dubai-registered company.',
  },
  {
    icon: Network,
    title: 'Partnership-Ready',
    desc: 'Structured to work with property owners, operators, fleets and organizations across multiple sectors.',
  },
  {
    icon: Wrench,
    title: 'End-to-End Support',
    desc: 'From site assessment and installation through to ongoing machine operation and maintenance.',
  },
];

const COMPANY_DETAILS = [
  { icon: Building2, label: 'Legal Name', value: COMPANY.legalName },
  { icon: MapPin, label: 'Office Address', value: COMPANY.address },
  { icon: Phone, label: 'Phone / WhatsApp', value: COMPANY.phone },
  { icon: Mail, label: 'Email', value: COMPANY.email },
  { icon: Globe, label: 'Website', value: COMPANY.website },
  { icon: Target, label: 'Established', value: COMPANY.established },
];

const DOWNLOAD_CARDS = [
  {
    icon: FileText,
    title: 'CXH01 Product Brochure',
    desc: 'Full product specifications, features, dimensions, technical details and use cases for the CXH01 helmet cleaning machine.',
    label: 'Download Brochure',
    url: DOWNLOADS.brochureUrl,
    fileName: 'Nexera-Smart-CXH01-Brochure.pdf',
  },
  {
    icon: Building2,
    title: 'Nexera Smart Company Profile',
    desc: 'Company overview, business positioning, partnership models and operational capabilities — suitable for internal review and procurement.',
    label: 'Download Company Profile',
    url: DOWNLOADS.companyProfileUrl,
    fileName: 'Nexera-Smart-Company-Profile.pdf',
  },
];

export default function About() {
  useSeo({
    title: 'About Nexera Smart | Smart Vending & Automated Solutions Dubai',
    description:
      'Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is a Dubai-based smart vending and automated self-service solutions company. Learn about our mission, company details and the CXH01 helmet cleaning machine.',
    path: '/about',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
    ],
  };
  useJsonLd('ld-org', organizationJsonLd);
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      {/* Hero */}
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
            ABOUT US
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            About Nexera Smart
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            A Dubai-based smart vending and automated self-service solutions company introducing
            practical technologies for high-footfall commercial locations.
          </p>
          <p className="mt-4 mx-auto max-w-2xl text-base font-semibold text-cyan-300">
            {COMPANY.tagline}
          </p>
        </div>
      </section>

      {/* Company overview */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-navy/80">
            <p>
              Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C is a Dubai-based company
              focused on smart vending machines and automated self-service technologies. We
              identify practical everyday problems in high-traffic commercial environments and
              develop solutions that improve convenience for users while creating commercial value
              for property owners and operators.
            </p>
            <p>
              Our mission is to introduce practical smart solutions that improve everyday
              convenience while helping commercial partners use their spaces more effectively. We
              work with property owners, fleet operators, logistics companies and businesses across
              delivery, mobility, commercial and logistics sectors.
            </p>
            <p>
              Our flagship CXH01 Helmet Cleaning Machine is designed for areas with significant
              motorcycle and delivery-rider activity, combining automated helmet cleaning,
              disinfection, heated drying, fragrance dispensing and digital payment capabilities in
              a compact self-service machine. The CXH01 is suitable for deployment across delivery
              ecosystems, mobility hubs, commercial areas and logistics facilities throughout the
              United Arab Emirates.
            </p>
          </div>
        </div>
      </section>

      {/* Dubai business positioning */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="DUBAI BUSINESS POSITIONING"
            heading="Built for Dubai's Commercial Landscape"
            subheading="Nexera Smart is structured to serve the specific needs of Dubai's high-traffic commercial and rider ecosystem."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POSITIONING_POINTS.map((point) => (
              <div key={point.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / approach cards */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading eyebrow="OUR APPROACH" heading="What Drives Nexera Smart" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {APPROACH_CARDS.map((card) => (
              <div key={card.title} className="card card-hover text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <card.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable materials */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="DOWNLOADS"
            heading="Downloadable Materials"
            subheading="Share these with your team, procurement department or property management for internal review."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {DOWNLOAD_CARDS.map((dl) => (
              <div key={dl.title} className="card card-hover flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                    <dl.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy">{dl.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy/70">{dl.desc}</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={dl.url}
                    download={dl.fileName}
                    className="btn-primary !py-2.5 text-sm"
                  >
                    <Download className="h-4 w-4" />
                    {dl.label}
                  </a>
                  <span className="text-xs text-navy/50">PDF</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white px-5 py-4 shadow-soft">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand mt-0.5" />
              <p className="text-xs leading-relaxed text-navy/60">
                Need additional information or a tailored proposal?{' '}
                <Link to="/contact" className="font-semibold text-brand hover:underline">
                  Contact our team
                </Link>{' '}
                and we'll prepare what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company details */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="COMPANY DETAILS"
            heading="Company Information"
            subheading="Official business details for procurement, property management and partnership enquiries."
          />
          <div className="mt-12 mx-auto max-w-3xl">
            <div className="rounded-2xl border border-cloud-300/60 bg-cloud-100 p-8 sm:p-10">
              <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {COMPANY_DETAILS.map((detail) => (
                  <div key={detail.label}>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                      <detail.icon className="h-4 w-4" />
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-navy">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Nexera Smart
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
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to Work With Nexera Smart?"
        text="Whether you're a property owner, procurement team or fleet operator, we'd like to hear from you."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Your Location"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
