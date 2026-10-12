import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Tag,
  Users,
  Ruler,
  Zap,
  Handshake,
  MessageSquare,
  MessageCircle,
  ArrowRight,
  Upload,
  CheckCircle2,
  AlertCircle,
  Send,
  Image as ImageIcon,
  X,
  Plug,
  Maximize2,
  Sun,
  Wrench,
} from 'lucide-react';
import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import SectionHeading from '@/components/SectionHeading';
import CtaBanner from '@/components/CtaBanner';

const LOCATION_TYPES = [
  'Delivery Ecosystem',
  'Mobility',
  'Commercial',
  'Logistics',
  'Other',
];

const FOOTFALL_OPTIONS = [
  'Less than 20 riders/day',
  '20–50 riders/day',
  '50–100 riders/day',
  '100+ riders/day',
  'Not sure',
];

const SPACE_OPTIONS = [
  'Less than 1 m²',
  'Approx. 1 m² (sufficient)',
  'More than 1 m² available',
  'Not sure',
];

const MODEL_OPTIONS = ['Revenue Sharing', 'Rental', 'Purchase', 'Not Sure'];

const SITE_REQUIREMENTS = [
  {
    icon: Ruler,
    title: 'Space',
    desc: 'A floor area of approximately 0.38 m² (620 × 620 mm) with enough height clearance for the 1780 mm tall machine.',
  },
  {
    icon: Plug,
    title: 'Electricity',
    desc: 'A standard 110–240V AC power outlet within reach of the intended placement position.',
  },
  {
    icon: Maximize2,
    title: 'Access',
    desc: 'Reasonable rider access to the machine location, including enough space for a rider to stand and use the touchscreen comfortably.',
  },
  {
    icon: Sun,
    title: 'Operating Environment',
    desc: 'A sheltered or indoor location is preferred. The machine should be protected from direct rain, water spray and extreme heat exposure.',
  },
  {
    icon: Wrench,
    title: 'Clearance',
    desc: 'Enough surrounding clearance for door opening, routine maintenance access and ventilation as specified during site assessment.',
  },
];

interface FormState {
  property_name: string;
  contact_person: string;
  mobile: string;
  email: string;
  location_area: string;
  location_type: string;
  rider_footfall: string;
  available_space: string;
  electricity_available: string;
  preferred_model: string;
  message: string;
  consent: boolean;
}

const INITIAL: FormState = {
  property_name: '',
  contact_person: '',
  mobile: '',
  email: '',
  location_area: '',
  location_type: '',
  rider_footfall: '',
  available_space: '',
  electricity_available: '',
  preferred_model: '',
  message: '',
  consent: false,
};

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

export default function SubmitLocation() {
  useSeo({
    title: 'Submit Your Location for Assessment | Nexera Smart',
    description:
      'Submit your location for a Nexera Smart CXH01 helmet cleaning machine assessment. Tell us about your property, rider footfall, available space and preferred partnership model.',
    path: '/submit-location',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Submit Location', item: `${SITE_URL}/submit-location` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please upload an image file (JPG, PNG, or WebP).');
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError('Photo must be 5 MB or smaller.');
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      let photoUrl: string | null = null;

      if (photoFile) {
        try {
          const ext = photoFile.name.split('.').pop() || 'jpg';
          const fileName = `location-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          const { error: uploadError } = await supabase.storage
            .from('location-photos')
            .upload(fileName, photoFile, { cacheControl: '3600', upsert: false });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from('location-photos')
              .getPublicUrl(fileName);
            photoUrl = urlData.publicUrl;
          } else {
            console.warn('Location photo upload skipped or failed:', uploadError.message);
          }
        } catch (uploadErr) {
          console.warn('Storage upload encountered an error:', uploadErr);
        }
      }

      const { error } = await supabase.from('location_submissions').insert({
        property_name: form.property_name,
        contact_person: form.contact_person,
        mobile: form.mobile,
        email: form.email,
        location_area: form.location_area,
        location_type: form.location_type,
        rider_footfall: form.rider_footfall || null,
        available_space: form.available_space || null,
        electricity_available:
          form.electricity_available === '' ? null : form.electricity_available === 'yes',
        preferred_model: form.preferred_model || null,
        message: form.message || null,
        photo_url: photoUrl,
        consent: form.consent,
      });

      if (error) throw error;
      setStatus('success');
      setForm(INITIAL);
      removePhoto();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

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
            SUBMIT YOUR LOCATION
          </span>
          <h1 className="mt-3 mx-auto max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Submit Your Location for Assessment
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Tell us about your property and we'll assess whether it's suitable for a Nexera Smart
            CXH01 helmet cleaning machine installation.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="mx-auto max-w-3xl">
            <div className="card">
              <h2 className="text-xl font-bold text-navy">Location Assessment Form</h2>
              <p className="mt-2 text-sm text-navy/60">
                Fields marked with <span className="text-red-500">*</span> are required. The more
                detail you provide, the faster we can assess your location.
              </p>

              {status === 'success' && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">Location submitted successfully.</p>
                      <p className="mt-1 text-sm text-green-700">
                        Thank you for your interest. Our team will review your submission and get
                        back to you shortly.
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
                    <Link to="/partner-with-us" className="btn-secondary w-full !py-2.5 text-sm">
                      Learn About Partnerships
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">Could not submit location.</p>
                    <p className="mt-1 text-sm text-red-700">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Property / Company Name */}
                <div>
                  <label htmlFor="property_name" className="block text-sm font-medium text-navy mb-1.5">
                    <Building2 className="inline h-4 w-4 mr-1 text-brand" />
                    Property / Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="property_name"
                    type="text"
                    required
                    value={form.property_name}
                    onChange={(e) => update('property_name', e.target.value)}
                    className="input-field"
                    placeholder="e.g. Al Manara Convenience Store"
                  />
                </div>

                {/* Contact Person + Mobile */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact_person" className="block text-sm font-medium text-navy mb-1.5">
                      <User className="inline h-4 w-4 mr-1 text-brand" />
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact_person"
                      type="text"
                      required
                      value={form.contact_person}
                      onChange={(e) => update('contact_person', e.target.value)}
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-navy mb-1.5">
                      <Phone className="inline h-4 w-4 mr-1 text-brand" />
                      Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => update('mobile', e.target.value)}
                      className="input-field"
                      placeholder="+971 5X XXX XXXX"
                    />
                  </div>
                </div>

                {/* Email + Location/Area */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                      <Mail className="inline h-4 w-4 mr-1 text-brand" />
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
                    <label htmlFor="location_area" className="block text-sm font-medium text-navy mb-1.5">
                      <MapPin className="inline h-4 w-4 mr-1 text-brand" />
                      Location / Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="location_area"
                      type="text"
                      required
                      value={form.location_area}
                      onChange={(e) => update('location_area', e.target.value)}
                      className="input-field"
                      placeholder="e.g. Deira, Dubai"
                    />
                  </div>
                </div>

                {/* Location Type + Rider Footfall */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="location_type" className="block text-sm font-medium text-navy mb-1.5">
                      <Tag className="inline h-4 w-4 mr-1 text-brand" />
                      Location Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="location_type"
                      required
                      value={form.location_type}
                      onChange={(e) => update('location_type', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select type</option>
                      {LOCATION_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rider_footfall" className="block text-sm font-medium text-navy mb-1.5">
                      <Users className="inline h-4 w-4 mr-1 text-brand" />
                      Approximate Rider Footfall Per Day
                    </label>
                    <select
                      id="rider_footfall"
                      value={form.rider_footfall}
                      onChange={(e) => update('rider_footfall', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select footfall</option>
                      {FOOTFALL_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Available Space + Electricity */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="available_space" className="block text-sm font-medium text-navy mb-1.5">
                      <Ruler className="inline h-4 w-4 mr-1 text-brand" />
                      Available Space
                    </label>
                    <select
                      id="available_space"
                      value={form.available_space}
                      onChange={(e) => update('available_space', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select space</option>
                      {SPACE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1.5">
                      <Zap className="inline h-4 w-4 mr-1 text-brand" />
                      Electricity Available
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-cloud-300 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-cloud-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:text-brand">
                        <input
                          type="radio"
                          name="electricity"
                          value="yes"
                          checked={form.electricity_available === 'yes'}
                          onChange={() => update('electricity_available', 'yes')}
                          className="text-brand focus:ring-brand"
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-cloud-300 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-cloud-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:text-brand">
                        <input
                          type="radio"
                          name="electricity"
                          value="no"
                          checked={form.electricity_available === 'no'}
                          onChange={() => update('electricity_available', 'no')}
                          className="text-brand focus:ring-brand"
                        />
                        No
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-cloud-300 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-cloud-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50 has-[:checked]:text-brand">
                        <input
                          type="radio"
                          name="electricity"
                          value="unsure"
                          checked={form.electricity_available === 'unsure'}
                          onChange={() => update('electricity_available', 'unsure')}
                          className="text-brand focus:ring-brand"
                        />
                        Not Sure
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preferred Model */}
                <div>
                  <label htmlFor="preferred_model" className="block text-sm font-medium text-navy mb-1.5">
                    <Handshake className="inline h-4 w-4 mr-1 text-brand" />
                    Preferred Model
                  </label>
                  <select
                    id="preferred_model"
                    value={form.preferred_model}
                    onChange={(e) => update('preferred_model', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select model</option>
                    {MODEL_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                    <MessageSquare className="inline h-4 w-4 mr-1 text-brand" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="input-field resize-y"
                    placeholder="Tell us about your location, rider activity, or any questions you have..."
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">
                    <ImageIcon className="inline h-4 w-4 mr-1 text-brand" />
                    Location Photo (optional)
                  </label>
                  <p className="mb-3 text-xs text-navy/50">
                    Upload a photo of the proposed placement area. JPG, PNG or WebP, max 5 MB.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  {!photoPreview ? (
                    <label
                      htmlFor="photo-upload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-cloud-300 bg-cloud-100 px-6 py-10 text-center transition-colors hover:border-brand hover:bg-brand-50"
                    >
                      <Upload className="h-8 w-8 text-navy/40" />
                      <span className="mt-3 text-sm font-medium text-navy/70">
                        Click to upload a location photo
                      </span>
                      <span className="mt-1 text-xs text-navy/40">JPG, PNG, WebP — max 5 MB</span>
                    </label>
                  ) : (
                    <div className="relative overflow-hidden rounded-xl border border-cloud-300 bg-cloud-100">
                      <img
                        src={photoPreview}
                        alt="Location preview"
                        className="h-48 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-navy shadow-soft transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {photoError && (
                    <p className="mt-2 text-sm text-red-600">{photoError}</p>
                  )}
                </div>

                {/* Consent */}
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
                    I consent to Nexera Smart contacting me about my location submission and
                    partnership opportunities. <span className="text-red-500">*</span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Location for Assessment
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Site Requirements */}
      <section className="section-pad bg-cloud-100">
        <div className="container-7xl">
          <SectionHeading
            eyebrow="SITE REQUIREMENTS"
            heading="Simple Site Requirements"
            subheading="The CXH01 is designed to be easy to install. Here's what a suitable location typically needs."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_REQUIREMENTS.map((req) => (
              <div key={req.title} className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <req.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{req.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/70">{req.desc}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white px-5 py-4 shadow-soft">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 shrink-0 text-brand mt-0.5" />
              <p className="text-xs leading-relaxed text-navy/60">
                Final installation requirements, operating clearances, utilities, site suitability
                and commercial arrangements are subject to site assessment and agreement. Not all
                proposed locations may be suitable for installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Have Another Location in Mind?"
        text="If you know of other suitable locations with strong rider footfall, submit them too — or share Nexera Smart with the location owner."
        primaryCtaTo="/partner-with-us"
        primaryCtaLabel="Learn About Partnerships"
        whatsappUrl={COMPANY.whatsappPartnershipUrl}
      />
    </>
  );
}
