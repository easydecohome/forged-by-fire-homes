import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import SiteEligibilityModal from './components/SiteEligibilityModal';
import { Models } from './components/Models';
import { SocialProof } from './components/SocialProof';
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
import { FinanceOptions } from './components/FinanceOptions';
import { ShousugiBanHistoryPage } from './pages/ShousugiBanHistoryPage';
import { SpecificationsPage } from './pages/SpecificationsPage';
import { ProcessPage } from './pages/ProcessPage';
import { ShouSugiBanPage } from './pages/ShouSugiBanPage';
import { InvestmentPage } from './pages/InvestmentPage';

// GitHub Pages base path
const BASE_PATH = '/forged-by-fire-homes';

// Normalize path by removing base path
function normalizePath(pathname: string): string {
  if (pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname || '/';
}

// Simple client-side router with GitHub Pages support
function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    const fullPath = BASE_PATH + to;
    window.history.pushState({}, '', fullPath);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { path, navigate };
}

// Intercept internal links
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
      <Hero openSiteEligibilityModal={openModal} />
      <TrustStrip />
      <SolutionSection />
      <Models />
      <FloorPlanExplorer />
      <FinanceOptions />
      <SocialProof />
      <Contact />
      <Footer />
      {/* Global Background Glow Accents */}
      <div className="fixed top-0 left-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full translate-x-1/2 translate-y-1/2 z-0 pointer-events-none" />
          <SiteEligibilityModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}

function App() {
  const { path, navigate } = useRoute();
  useLinkInterceptor(navigate);

  // Normalize path checks
  const isHome = path === '/' || path === '';
  const isSpecifications = path === '/specifications';
  const isProcess = path === '/process';
  const isShouSugiBan = path === '/shou-sugi-ban';
  const isInvestment = path === '/investment';
  const isShousugiBanHistory = path === '/shou-sugi-ban-history';
  const isProduct = path === '/product';
  const isFeatures = path === '/features';

  return (
    <AnimatePresence mode="wait">
      {isSpecifications ? (
        <motion.div
          key="specifications"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SpecificationsPage />
        </motion.div>
      ) : isProcess ? (
        <motion.div
          key="process"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProcessPage />
        </motion.div>
      ) : isShouSugiBan ? (
        <motion.div
          key="shou-sugi-ban"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ShouSugiBanPage />
        </motion.div>
      ) : isInvestment ? (
        <motion.div
          key="investment"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <InvestmentPage />
        </motion.div>
      ) : isShousugiBanHistory ? (
        <motion.div
          key="shou-sugi-ban-history"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ShousugiBanHistoryPage />
        </motion.div>
      ) : isProduct ? (
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
