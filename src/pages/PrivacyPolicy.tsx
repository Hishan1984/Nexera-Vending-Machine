import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import CtaBanner from '@/components/CtaBanner';

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy | Nexera Smart',
    description:
      'Privacy policy for Nexera Smart For Vending Machines Trading CO. L.L.C S.O.C. Learn how we collect, use and protect your information.',
    path: '/privacy-policy',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy-policy` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">LEGAL</span>
          <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-navy/60">Last updated: August 2026</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="prose-legal mx-auto max-w-3xl">
            <p>
              This Privacy Policy describes how {COMPANY.legalName} ("Nexera Smart", "we", "us")
              collects, uses and protects information you provide through this website.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We collect information you voluntarily provide when you submit a partnership enquiry
              or contact form. This may include your full name, company name, email address, phone
              number, location, type of property, expected rider footfall, partnership interest and
              message content.
            </p>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>To respond to your enquiries and discuss partnership opportunities.</li>
              <li>To provide information about our products and services.</li>
              <li>To improve our website and service offerings.</li>
              <li>To comply with applicable legal and regulatory requirements.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade or rent your personal information to third parties. We may share
              information with trusted service providers who assist us in operating our business,
              subject to appropriate confidentiality obligations.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your
              information against unauthorized access, alteration, disclosure or destruction.
            </p>

            <h2>5. Cookies</h2>
            <p>
              This website may use cookies and similar technologies to improve user experience and
              analyze website traffic. You can control cookies through your browser settings.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of such websites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by
              contacting us using the details provided below.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              This website is not directed at children under the age of 18. We do not knowingly
              collect personal information from children.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated revision date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>{COMPANY.legalName}</li>
              <li>{COMPANY.address}</li>
              <li>Phone / WhatsApp: {COMPANY.phone}</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
