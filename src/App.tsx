import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Models } from './components/Models';
import { Craft } from './components/Craft';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  React.useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground noise-overlay relative overflow-hidden">
      <Navbar />
      <Hero />
      <Models />
      <Craft />
      <Process />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
      
      {/* Global Background Glow Accents */}
      <div className="fixed top-0 left-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full translate-x-1/2 translate-y-1/2 z-0 pointer-events-none"></div>
    </main>
  );
}

export default App;
