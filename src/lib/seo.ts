import { useEffect } from 'react';
import { COMPANY, SITE_URL } from '@/lib/constants';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  robots?: string;
  jsonLd?: Record<string, unknown> | Array<{ id: string; data: unknown }>;
}

function ensureMeta(attr: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function ensureLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function ensureScript(id: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.getElementById(id);
  if (el) el.remove();
  el = document.createElement('script');
  el.id = id;
  el.setAttribute('type', 'application/ld+json');
  el.textContent = content;
  document.head.appendChild(el);
}

const DEFAULT_IMAGE = `${SITE_URL}/cxh01-machine.webp`;

export function useSeo({
  title,
  description,
  path,
  image,
  type = 'website',
  robots = 'index, follow',
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = image || DEFAULT_IMAGE;

    document.title = title;
    ensureMeta('name', 'description', description);
    ensureMeta('name', 'robots', robots);
    ensureLink('canonical', url);

    // OpenGraph
    ensureMeta('property', 'og:title', title);
    ensureMeta('property', 'og:description', description);
    ensureMeta('property', 'og:url', url);
    ensureMeta('property', 'og:image', img);
    ensureMeta('property', 'og:type', type);
    ensureMeta('property', 'og:site_name', COMPANY.brand);
    ensureMeta('property', 'og:locale', 'en_AE');

    // Twitter
    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', title);
    ensureMeta('name', 'twitter:description', description);
    ensureMeta('name', 'twitter:image', img);

    // Dubai / UAE GEO-Targeting
    ensureMeta('name', 'geo.region', 'AE-DU');
    ensureMeta('name', 'geo.placename', 'Dubai');
    ensureMeta('name', 'geo.position', '25.2697;55.2974');
    ensureMeta('name', 'ICBM', '25.2697, 55.2974');

    // Structured Data if passed
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        jsonLd.forEach(({ id, data }) => ensureScript(id, JSON.stringify(data)));
      } else {
        ensureScript('ld-page', JSON.stringify(jsonLd));
      }
    }
  }, [title, description, path, image, type, robots, jsonLd]);
}

/**
 * Hook to inject JSON-LD safely inside useEffect without mutating DOM during render.
 */
export function useJsonLd(id: string, data: unknown) {
  const jsonStr = JSON.stringify(data);
  useEffect(() => {
    ensureScript(id, jsonStr);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id, jsonStr]);
}

/**
 * Backwards compatibility helper for imperatively setting JSON-LD.
 */
export function setJsonLd(id: string, data: unknown) {
  ensureScript(id, JSON.stringify(data));
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: COMPANY.legalName,
  alternateName: COMPANY.brand,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  image: `${SITE_URL}/cxh01-machine.webp`,
  telephone: COMPANY.phoneRaw,
  email: COMPANY.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-03, Al Shindagha, Deira',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2697,
    longitude: 55.2974,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Dubai, United Arab Emirates',
  },
  sameAs: [],
};
