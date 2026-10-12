import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { ASSETS, COMPANY } from '@/lib/constants';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/helmet-cleaning-machine', label: 'Helmet Cleaning Machine' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/for-riders', label: 'For Riders' },
  { to: '/partner-with-us', label: 'Partner With Us' },
  { to: '/submit-location', label: 'Submit Location' },
  { to: '/locations', label: 'Locations' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-cloud-300/60'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-7xl flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Nexera Smart home">
          <img
            src={ASSETS.logo}
            alt="Nexera Smart logo"
            className="h-8 w-auto sm:h-9 lg:h-10"
            width={160}
            height={40}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-brand bg-brand-50' : 'text-navy/80 hover:text-brand hover:bg-cloud-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={COMPANY.whatsappGeneralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-whatsapp !px-4 !py-2.5 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <Link to="/submit-location" className="hidden sm:inline-flex btn-primary !px-4 !py-2.5 text-sm">
            Submit Location
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy hover:bg-cloud-100 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          <div
            className="xl:hidden fixed inset-0 top-16 lg:top-20 z-40 bg-navy/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className="xl:hidden fixed top-16 lg:top-20 left-0 right-0 z-50 max-h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-5rem)] overflow-y-auto bg-white border-t border-cloud-300/60 shadow-lg animate-slide-down"
            aria-label="Mobile navigation"
          >
            <div className="container-7xl py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3.5 text-base font-medium transition-colors min-h-[44px] ${
                      isActive ? 'text-brand bg-brand-50' : 'text-navy hover:bg-cloud-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <a
                  href={COMPANY.whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Nexera
                </a>
                <Link to="/submit-location" className="btn-primary w-full">
                  Submit Location
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
