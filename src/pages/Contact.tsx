import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, CheckCircle2, AlertCircle, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import CtaBanner from '@/components/CtaBanner';

const PROPERTY_TYPES = [
  'Delivery Rider Rest Area',
  'Convenience Store',
  'Driving School',
  'Petrol / Service Station',
  'Warehouse / Logistics',
  'Commercial Building',
  'Shopping Area',
  'Restaurant / F&B',
  'Other',
];

const PARTNERSHIP_INTERESTS = [
  'Revenue Sharing',
  'Space Rental',
  'Machine Purchase / Supply',
  'Not Sure',
];

interface FormState {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  location: string;
  property_type: string;
  rider_footfall: string;
  partnership_interest: string;
  message: string;
  consent: boolean;
}

const INITIAL: FormState = {
  full_name: '',
  company_name: '',
  email: '',
  phone: '',
  location: '',
  property_type: '',
  rider_footfall: '',
  partnership_interest: '',
  message: '',
  consent: false,
};

export default function Contact() {
  useSeo({
    title: 'Contact Nexera Smart | Helmet Cleaning Machine Partnerships Dubai',
    description:
      'Contact Nexera Smart to discuss placing a CXH01 helmet cleaning machine at your location in Dubai. Submit a partnership enquiry or reach us via WhatsApp.',
    path: '/contact',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  };
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.legalName,
    image: `${SITE_URL}/cxh01-machine.webp`,
    telephone: COMPANY.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-03, Al Shindagha, Deira',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    url: SITE_URL,
  };
  useJsonLd('ld-localbusiness', localBusiness);
  useJsonLd('ld-breadcrumb', breadcrumb);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [honeypot, setHoneypot] = useState('');
  const [formMountedAt, setFormMountedAt] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    let dbSuccess = false;
    let emailSuccess = false;
    let dbErrorMessage = '';
    let emailErrorMessage = '';

    // Step 1: Save enquiry to Supabase
    try {
      const { error: dbError } = await supabase.from('contact_enquiries').insert({
        full_name: form.full_name.trim(),
        company_name: form.company_name.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        location: form.location.trim() || null,
        property_type: form.property_type || null,
        rider_footfall: form.rider_footfall.trim() || null,
        partnership_interest: form.partnership_interest || null,
        message: form.message.trim() || null,
        consent: form.consent,
      });

      if (dbError) {
        dbErrorMessage = dbError.message;
      } else {
        dbSuccess = true;
      }
    } catch (err) {
      dbErrorMessage = err instanceof Error ? err.message : 'Database connection error';
    }

    // Step 2: Send email via authenticated server-side PHP SMTP handler
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          company_name: form.company_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          location: form.location.trim(),
          property_type: form.property_type,
          rider_footfall: form.rider_footfall.trim(),
          partnership_interest: form.partnership_interest,
          message: form.message.trim(),
          consent: form.consent,
          _hp: honeypot,
          website_address_hp: honeypot,
          _ts: formMountedAt,
        }),
      });

      const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (res.ok && data?.success) {
        emailSuccess = true;
      } else {
        emailErrorMessage = data?.message || `Server responded with HTTP ${res.status}`;
      }
    } catch (err) {
      emailErrorMessage = err instanceof Error ? err.message : 'Network error reaching mail handler';
    }

    // Handle outcomes accurately without showing false success
    if (dbSuccess && emailSuccess) {
      setStatus('success');
      setForm(INITIAL);
      setHoneypot('');
      setFormMountedAt(Date.now());
    } else if (dbSuccess && !emailSuccess) {
      setStatus('error');
      setErrorMsg(
        `Enquiry saved to database, but notification email could not be dispatched (${emailErrorMessage}). Please contact us via WhatsApp to ensure your enquiry is received immediately.`
      );
    } else if (!emailSuccess && !dbSuccess) {
      setStatus('error');
      setErrorMsg(
        `Unable to submit enquiry. Database error: ${dbErrorMessage || 'Failed'}. Email error: ${emailErrorMessage || 'Failed'}. Please contact us via WhatsApp or phone.`
      );
    } else {
      // Email succeeded but DB failed
      setStatus('error');
      setErrorMsg(
        `Notification email was delivered, but recording to database failed (${dbErrorMessage}). Our team has received your email and will follow up shortly.`
      );
    }
  };

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">CONTACT</span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
            Let's Discuss a Nexera Location
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-navy/70 sm:text-lg">
            Tell us about your location and we'll get back to you to discuss partnership
            opportunities.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <div className="card sticky top-24">
              <h2 className="text-lg font-bold text-navy">Nexera Smart</h2>
              <p className="mt-1 text-sm text-navy/60">{COMPANY.legalName}</p>

              <ul className="mt-6 space-y-5">
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">Office</p>
                    <p className="mt-1 text-sm text-navy/80">{COMPANY.address}</p>
                  </div>
                </li>
                <li>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="flex gap-3 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">Phone</p>
                      <p className="mt-1 text-sm text-navy/80 group-hover:text-brand transition-colors">{COMPANY.phone}</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={COMPANY.whatsappPartnershipUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">WhatsApp</p>
                      <p className="mt-1 text-sm text-navy/80 group-hover:text-green-600 transition-colors">{COMPANY.phone}</p>
                    </div>
                  </a>
                </li>
                <li className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy/50">Email</p>
                    <p className="mt-1 text-sm text-navy/80">{COMPANY.email}</p>
                  </div>
                </li>
              </ul>

              {/* Mobile-friendly quick contact buttons */}
              <div className="mt-8 space-y-2.5 sm:hidden">
                <a
                  href={COMPANY.whatsappPartnershipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
                <a href={`tel:${COMPANY.phoneRaw}`} className="btn-secondary w-full">
                  <Phone className="h-5 w-5" />
                  Call {COMPANY.phone}
                </a>
                <Link to="/submit-location" className="btn-primary w-full">
                  Submit Your Location
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Desktop WhatsApp button */}
              <a
                href={COMPANY.whatsappPartnershipUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-8 w-full hidden sm:inline-flex"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <div className="card">
              <h2 className="text-xl font-bold text-navy">Send Partnership Enquiry</h2>
              <p className="mt-2 text-sm text-navy/60">
                Fill in the form below and our team will get back to you. For a faster response,
                message us on WhatsApp.
              </p>

              {status === 'success' && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">Enquiry sent successfully.</p>
                      <p className="mt-1 text-sm text-green-700">
                        Thank you for your interest. Our team will be in touch shortly.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={COMPANY.whatsappPartnershipUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full !py-2.5 text-sm"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Continue on WhatsApp
                    </a>
                    <Link to="/submit-location" className="btn-secondary w-full !py-2.5 text-sm">
                      Submit Your Location
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Could not send enquiry.</p>
                    <p className="mt-1 text-sm text-red-700">{errorMsg}</p>
                    <p className="mt-2 text-sm text-red-600">
                      You can also reach us on{' '}
                      <a
                        href={COMPANY.whatsappPartnershipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        WhatsApp
                      </a>{' '}
                      or by phone at {COMPANY.phone}.
                    </p>
                  </div>
                </div>
              )}

              {status !== 'success' && (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Honeypot field hidden from users for bot protection */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="website_address_hp">Do not fill this field</label>
                    <input
                      id="website_address_hp"
                      name="website_address_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-navy mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="full_name"
                        type="text"
                        required
                        value={form.full_name}
                        onChange={(e) => update('full_name', e.target.value)}
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="company_name" className="block text-sm font-medium text-navy mb-1.5">
                        Company Name
                      </label>
                      <input
                        id="company_name"
                        type="text"
                        value={form.company_name}
                        onChange={(e) => update('company_name', e.target.value)}
                        className="input-field"
                        placeholder="Company (optional)"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="input-field"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className="input-field"
                        placeholder="+971 5X XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-navy mb-1.5">
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={form.location}
                      onChange={(e) => update('location', e.target.value)}
                      className="input-field"
                      placeholder="Area or address in Dubai/UAE"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="property_type" className="block text-sm font-medium text-navy mb-1.5">
                        Type of Property
                      </label>
                      <select
                        id="property_type"
                        value={form.property_type}
                        onChange={(e) => update('property_type', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select type</option>
                        {PROPERTY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="partnership_interest" className="block text-sm font-medium text-navy mb-1.5">
                        Partnership Interest
                      </label>
                      <select
                        id="partnership_interest"
                        value={form.partnership_interest}
                        onChange={(e) => update('partnership_interest', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Select interest</option>
                        {PARTNERSHIP_INTERESTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rider_footfall" className="block text-sm font-medium text-navy mb-1.5">
                      Expected Rider / Motorcycle Footfall
                    </label>
                    <input
                      id="rider_footfall"
                      type="text"
                      value={form.rider_footfall}
                      onChange={(e) => update('rider_footfall', e.target.value)}
                      className="input-field"
                      placeholder="e.g. High — 50+ riders per day"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="input-field resize-y"
                      placeholder="Tell us about your location and interest..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={(e) => update('consent', e.target.checked)}
                      className="mt-1 h-5 w-5 rounded border-cloud-300 text-brand focus:ring-brand"
                    />
                    <label htmlFor="consent" className="text-sm text-navy/70">
                      I consent to Nexera Smart contacting me about my enquiry and partnership
                      opportunities. <span className="text-red-500">*</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Partnership Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Ready to Submit Your Location?"
        text="If you have a high-traffic location with regular rider activity, submit it for assessment and we'll evaluate it for a CXH01 installation."
        primaryCtaTo="/submit-location"
        primaryCtaLabel="Submit Location for Assessment"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
