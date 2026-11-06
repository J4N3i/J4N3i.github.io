import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  // Preloader renders only on the client after hydration so prerendered HTML has no overlay
  const [showPreloader, setShowPreloader] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsHeroReady(true);
      return;
    }
    setShowPreloader(true);
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsHeroReady(true);
  };

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPreloader]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Preloader - client-only, skipped in SSR and reduced-motion */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div>
        <Navigation />
        <main>
          <HeroSection ready={isHeroReady} />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
};

export default Index;
