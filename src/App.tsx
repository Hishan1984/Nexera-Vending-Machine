import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';

// Lazy-loaded routes for optimal bundle chunking and Core Web Vitals
const Home = lazy(() => import('@/pages/Home'));
const HelmetCleaningMachine = lazy(() => import('@/pages/HelmetCleaningMachine'));
const HowItWorks = lazy(() => import('@/pages/HowItWorks'));
const ForRiders = lazy(() => import('@/pages/ForRiders'));
const PartnerWithUs = lazy(() => import('@/pages/PartnerWithUs'));
const Locations = lazy(() => import('@/pages/Locations'));
const About = lazy(() => import('@/pages/About'));
const Faq = lazy(() => import('@/pages/Faq'));
const Contact = lazy(() => import('@/pages/Contact'));
const SubmitLocation = lazy(() => import('@/pages/SubmitLocation'));
const HelmetCleaningMachineDubai = lazy(() => import('@/pages/HelmetCleaningMachineDubai'));
const HelmetSanitizerMachineDubai = lazy(() => import('@/pages/HelmetSanitizerMachineDubai'));
const DeliveryRiderHelmetCleaning = lazy(() => import('@/pages/DeliveryRiderHelmetCleaning'));
const HelmetCleaningForDrivingSchools = lazy(() => import('@/pages/HelmetCleaningForDrivingSchools'));
const HelmetCleaningForPetrolStations = lazy(() => import('@/pages/HelmetCleaningForPetrolStations'));
const HelmetCleaningForDeliveryHubs = lazy(() => import('@/pages/HelmetCleaningForDeliveryHubs'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Sitemap = lazy(() => import('@/pages/Sitemap'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent"
        role="status"
        aria-label="Loading page"
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/helmet-cleaning-machine" element={<HelmetCleaningMachine />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-riders" element={<ForRiders />} />
            <Route path="/partner-with-us" element={<PartnerWithUs />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit-location" element={<SubmitLocation />} />
            <Route path="/helmet-cleaning-machine-dubai" element={<HelmetCleaningMachineDubai />} />
            <Route path="/helmet-sanitizer-machine-dubai" element={<HelmetSanitizerMachineDubai />} />
            <Route path="/delivery-rider-helmet-cleaning" element={<DeliveryRiderHelmetCleaning />} />
            <Route path="/helmet-cleaning-machine-for-driving-schools" element={<HelmetCleaningForDrivingSchools />} />
            <Route path="/helmet-cleaning-machine-for-petrol-stations" element={<HelmetCleaningForPetrolStations />} />
            <Route path="/helmet-cleaning-machine-for-delivery-hubs" element={<HelmetCleaningForDeliveryHubs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
