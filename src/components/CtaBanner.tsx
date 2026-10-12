import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

interface CtaBannerProps {
  heading?: string;
  text?: string;
  primaryCtaTo?: string;
  primaryCtaLabel?: string;
  whatsappUrl?: string;
}

export default function CtaBanner({
  heading = 'Have a High-Traffic Location?',
  text = "If your property, store, rider facility, driving school or commercial location receives significant motorcycle traffic, we would like to hear from you.",
  primaryCtaTo = '/partner-with-us',
  primaryCtaLabel = 'Partner With Us',
  whatsappUrl = COMPANY.whatsappPartnershipUrl,
}: CtaBannerProps) {
  return (
    <section className="section-pad">
      <div className="container-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-navy px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 text-white shadow-glow">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(50% 70% at 90% 20%, rgba(0,191,216,0.35) 0%, transparent 60%), radial-gradient(40% 60% at 10% 90%, rgba(8,118,217,0.30) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-balance">{heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to={primaryCtaTo} className="btn-primary">
                {primaryCtaLabel}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
              <a href={`tel:${COMPANY.phoneRaw}`} className="btn-secondary !bg-white/10 !border-white/20 !text-white hover:!bg-white/20">
                <Phone className="h-5 w-5" />
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
