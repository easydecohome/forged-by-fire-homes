import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Models } from './components/Models';
import { Craft } from './components/Craft';
import { ShousugiBanStory } from './components/ShousugiBanStory';
import { Process } from './components/Process';
import { SocialProof } from './components/SocialProof';
import { ROICalculator } from './components/ROICalculator';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FeaturesPage } from './pages/FeaturesPage';
import { ProductPage } from './pages/ProductPage';
import UrgencyBanner from './components/UrgencyBanner';
import { NewsletterModal } from './components/NewsletterModal';
import { SolutionSection } from './components/SolutionSection';
import { LifestyleTransform } from './components/LifestyleTransform';
import { FloorPlanExplorer } from './components/FloorPlanExplorer';
import { TrustStrip } from './components/TrustStrip';
import { CouncilApprovalRoadmap } from './components/CouncilApprovalRoadmap';
import { TotalCostBreakdown } from './components/TotalCostBreakdown';
import { DeliveryMap } from './components/DeliveryMap';
// import EnvironmentalBenefits from './components/EnvironmentalBenefits';

// Simple client-side router
function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path, navigate };
}

// Intercept <a href="/features"> clicks
function useLinkInterceptor(navigate: (to: string) => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        e.preventDefault();
        navigate(href);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [navigate]);
}

function HomePage() {
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setNewsletterOpen(true), 30000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground noise-overlay relative overflow-hidden">
      <UrgencyBanner />
      <NewsletterModal open={newsletterOpen} onOpenChange={setNewsletterOpen} />
      <Navbar />
      <Hero />
      <TrustStrip />
      <CouncilApprovalRoadmap />
      <TotalCostBreakdown />
      <DeliveryMap />
      <SolutionSection />
      <Models />
      <LifestyleTransform />
      <FloorPlanExplorer />
      <Craft />
      <ShousugiBanStory />
      <Process />
      <SocialProof />
      <ROICalculator />
      <Pricing />
      <Contact />
      <Footer />
      {/* Global Background Glow Accents */}
      <div className="fixed top-0 left-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full translate-x-1/2 translate-y-1/2 z-0 pointer-events-none" />
    </main>
  );
}

function App() {
  const { path, navigate } = useRoute();
  useLinkInterceptor(navigate);

  const isFeatures = path === '/features' || path.includes('/features');
  const isProduct = path === '/product' || path.includes('/product');

  return (
    <AnimatePresence mode="wait">
      {isProduct ? (
        <motion.div
          key="product"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProductPage onBack={() => navigate('/')} />
        </motion.div>
      ) : isFeatures ? (
        <motion.div
          key="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FeaturesPage />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <HomePage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
