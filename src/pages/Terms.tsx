import { useSeo, useJsonLd } from '@/lib/seo';
import { COMPANY, SITE_URL } from '@/lib/constants';
import CtaBanner from '@/components/CtaBanner';

export default function Terms() {
  useSeo({
    title: 'Terms & Conditions | Nexera Smart',
    description:
      'Terms and conditions for the Nexera Smart website and services. Read the terms governing use of this website.',
    path: '/terms',
  });

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Terms & Conditions', item: `${SITE_URL}/terms` },
    ],
  };
  useJsonLd('ld-breadcrumb', breadcrumb);

  return (
    <>
      <section className="bg-cloud-100 py-14 lg:py-20">
        <div className="container-7xl text-center">
          <span className="eyebrow">LEGAL</span>
          <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-navy/60">Last updated: August 2026</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-7xl">
          <div className="prose-legal mx-auto max-w-3xl">
            <p>
              These Terms &amp; Conditions govern your use of this website, operated by{' '}
              {COMPANY.legalName} ("Nexera Smart", "we", "us"). By accessing this website, you agree
              to these terms.
            </p>

            <h2>1. Use of This Website</h2>
            <p>
              You may use this website for lawful purposes only. You agree not to use this website in
              any way that could damage, disable, or impair the website or interfere with any other
              party's use.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images and software, is
              the property of Nexera Smart or its licensors and is protected by applicable
              intellectual property laws. You may not reproduce, distribute or otherwise use the
              content without prior written permission.
            </p>

            <h2>3. Product Information</h2>
            <p>
              We strive to present accurate information about our products and services. However, we
              do not warrant that all product descriptions, specifications or other content on this
              website are entirely accurate, complete or current. Machine configuration, features
              and specifications may vary based on installation and commercial agreement.
            </p>

            <h2>4. No Medical or Health Claims</h2>
            <p>
              The CXH01 helmet cleaning machine is designed to support helmet sanitation using
              high-temperature steam and UVC technology. We do not make any medical, health or
              scientific claims regarding the prevention of infections, allergies or diseases unless
              supported by certified documentation.
            </p>

            <h2>5. Partnership Enquiries</h2>
            <p>
              Submission of a partnership enquiry through this website does not constitute a binding
              agreement. All commercial arrangements, including revenue sharing, space rental and
              machine supply, are subject to site assessment, negotiation and a formal written
              agreement between the parties.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. We are not responsible for the
              content or practices of those websites.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Nexera Smart shall not be liable for any
              indirect, incidental, special or consequential damages arising from your use of this
              website or reliance on any information provided herein.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the
              United Arab Emirates and the Emirate of Dubai.
            </p>

            <h2>9. Changes to These Terms</h2>
            <p>
              We may update these Terms &amp; Conditions from time to time. Changes will be posted on
              this page with an updated revision date.
            </p>

            <h2>10. Contact Us</h2>
            <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
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
