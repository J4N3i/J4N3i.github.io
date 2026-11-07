import { useState, useEffect, useCallback } from 'react';
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
import { SiteBackground } from '@/components/SiteBackground';

const hasSeenIntro = (): boolean => {
  try {
    return sessionStorage.getItem('intro-seen') === '1';
  } catch {
    return false;
  }
};

const markIntroSeen = (): void => {
  try {
    sessionStorage.setItem('intro-seen', '1');
  } catch {
    // Storage access blocked or unavailable
  }
};

const shouldSkipIntro = (): boolean => {
  if (typeof window === 'undefined') return true;

  // 1. Already seen in this session
  if (hasSeenIntro()) return true;

  // 2. Accessibility preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  // 3. Direct deep link with anchor hash
  if (window.location.hash) return true;

  // 4. Navigated via reload or back/forward
  try {
    const navEntries = performance.getEntriesByType('navigation');
    const navEntry = navEntries[0] as PerformanceNavigationTiming | undefined;
    if (navEntry && navEntry.type !== 'navigate') {
      return true;
    }
  } catch {
    // Fallback if performance entry is unavailable
  }

  return false;
};

const Index = () => {
  // Preloader renders only on the client after hydration so prerendered HTML has no overlay
  const [showPreloader, setShowPreloader] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [hasIntroDelay, setHasIntroDelay] = useState(false);

  useEffect(() => {
    if (shouldSkipIntro()) {
      markIntroSeen();
      setShowPreloader(false);
      setHasIntroDelay(false);
      setIsHeroReady(true);
      return;
    }

    setHasIntroDelay(true);
    setShowPreloader(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    markIntroSeen();
    setShowPreloader(false);
    setIsHeroReady(true);
  }, []);

  // Failsafe: force remove preloader overlay after 2.5s if anything hangs
  useEffect(() => {
    if (!showPreloader) return;

    const timer = setTimeout(() => {
      handlePreloaderComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [showPreloader, handlePreloaderComplete]);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader]);

  return (
    <div className="min-h-[100svh] bg-background text-foreground overflow-x-hidden relative">
      {/* Site-wide calm background */}
      <SiteBackground />

      {/* Preloader - client-only, skipped in SSR and reduced-motion */}
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div aria-hidden={showPreloader ? true : undefined} className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to content
        </a>
        <Navigation ready={isHeroReady} />
        <main id="main">
          <HeroSection ready={isHeroReady} startDelay={hasIntroDelay ? 0.1 : 0} />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatBot ready={isHeroReady} />
      </div>
    </div>
  );
};

export default Index;
